import { camera, battery } from './datgaModule.js';
const $ = document;
const target = $.getElementById("target");

// 初期化処理
(function (target) {
  target.innerHTML = `
<div class="container">
    <p class="mb-0">Step1: Select your brand</p>
    <div class="mb-4">
        <select name="" id="brandArea">
        </select>
    </div>

    <p class="mb-0">Step2: Select your model</p>
    <div class="mb-4">
        <select name="" id="modelArea">
        </select>
    </div>

    <p class="mb-0">Step3: Input accessory power consumption</p>
    <div class="mb-4">
        <input
            type="number"
            name=""
            id="accessoryPowerArea"
            min="0"
            max="100"
            value="55"
        />
    </div>

    <div>
        <p class="mb-0">Step4: Choose your battery</p>
        <div id="batteryArea">
        </div>
    </div>
</div>
    `

}(target));

const accessDomLists = {
  brandArea: $.getElementById("brandArea"),
  modelArea: $.getElementById("modelArea"),
  batteryArea: $.getElementById("batteryArea"),
  accessoryPowerArea: $.getElementById("accessoryPowerArea")
}

class Brand {

  // select要素（電池の種類）の初期化処理
  static initialize() {
    const target = accessDomLists.brandArea;
    // brandをキーに重複している要素を取り除く
    const brandArry = [...new Map(camera.map(item => [item.brand, item])).values()];

    for (let i = 0; i < brandArry.length; i++) {
      target.innerHTML += `
        <option value="${brandArry[i].brand}">${brandArry[i].brand}</option>
        `
    }

    target.addEventListener('change', (event) => {
      Calculate.selectBrand(event);
      ChooseBatteryView.createBatteryList();
    });
  }
}

class BatteryModel {

  // select要素（電池のモデル）の初期化処理
  static initialize(brand) {
    const target = accessDomLists.modelArea;

    for (let i = 0; i < camera.length; i++) {
      if (camera[i]["brand"] === brand) {
        target.innerHTML += `
          <option value="${camera[i]["model"]}">${camera[i]["model"]}</option>
          `
      }
    }

    target.addEventListener('change', () => {
      ChooseBatteryView.createBatteryList();
    });
  }
}

class InputAccessory {

  // input要素（アクセサリーの消費電力）の初期化処理
  static initialize() {
    accessDomLists.accessoryPowerArea.addEventListener('change', () => {
      ChooseBatteryView.createBatteryList();
    });
  }
}

class ChooseBatteryView {

  // 要件を満たしている電池を表示及び持続時間を計算
  static createBatteryList() {
    const target = accessDomLists.batteryArea;
    target.innerHTML = "";
    // batteryNameをキーにアルファベット順に並び替え
    let sort_battery = battery.sort((a, b) => (a.batteryName < b.batteryName) ? -1 : 1);

    for (let i = 0; i < battery.length; i++) {
      if (Calculate.IsSafetyVoltage(sort_battery[i])) {
        let estimate_hour = Calculate.calcurateEstimate(sort_battery[i].voltage, sort_battery[i].capacityAh);
        target.innerHTML += `
          <div class="bg-light border d-flex justify-content-between">
            <div class="p-2 font-weight-bold">${sort_battery[i].batteryName}</div>
            <div class="p-2">Estimate ${estimate_hour} hours</div>
          </div>
          `
      }
    }
  }
}

class Calculate {

  static selectBrand(event) {
    // select要素で選択された値を取得する
    let brand_name = event.target.value;

    // ブランド名を元にcameraのデータから一致するものを抽出
    let new_model_lists = camera.filter((item) => item.brand === brand_name);

    const target = accessDomLists.modelArea;
    target.innerHTML = "";
    for (let i = 0; i < new_model_lists.length; i++) {
      target.innerHTML += `
            <option value="${new_model_lists[i].model}">${new_model_lists[i].model}</option>
            `
    }
  }

  static IsSafetyVoltage(batteryData) {
    const selectModel = accessDomLists.modelArea;
    // 現在選択されているカメラのモデルより、カメラのデータを取得
    let filter_result = camera.filter(item => item.model === selectModel.value);
    // アクセサリーの消費電力の数値入力欄を取得
    let accessory_power = parseInt(accessDomLists.accessoryPowerArea.value);
    // アクセサリーの消費電力とカメラの消費電力を合計する
    let total_power_consumption = filter_result[0].powerConsumptionWh + accessory_power;
    // 電池の安全性を考慮した消費電力の値（この値を超える消費電力のカメラには対応していない）
    let safety_voltage = (batteryData.maxDraw * batteryData.endVoltage).toFixed(1);

    return total_power_consumption < parseInt(safety_voltage);
  }

  static calcurateEstimate(voltage, capacityAh) {
    const selectModel = accessDomLists.modelArea;
    // アクセサリーの消費電力の数値入力欄を取得
    let accessory_power = parseInt(accessDomLists.accessoryPowerArea.value);
    // 現在選択されているカメラのモデルより、カメラのデータを取得
    let filter_result = camera.filter(item => item.model === selectModel.value);
    // アクセサリーの消費電力とカメラの消費電力を合計する
    let total_power_consumption = filter_result[0].powerConsumptionWh + accessory_power;
    // 選択されている電池のブランドと、モデルを元に持続可能時間を計算する
    let sustainability = Math.round((voltage * capacityAh / total_power_consumption) * 10) / 10;

    // 固定小数点表記を用いて整形
    // INFO1: https://stackoverflow.com/questions/27834961/javascript-how-to-convert-number-1-0-to-string-1-0/27835002
    // INFO2: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
    return sustainability.toFixed(1);
  }
}

Brand.initialize();
BatteryModel.initialize("Cakon");
InputAccessory.initialize();
ChooseBatteryView.createBatteryList();