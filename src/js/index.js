import { camera, battery } from './Entity/DataEntity';
import '@scss/style';

/**
 * id要素を格納するオブジェクト
 */
const config = {};

/**
 * 画面を描画するクラス
 */
class MainView {
  /**
   * オブジェクトを格納
   */
  static camera = camera;

  /**
   * メインとなるHTML要素を描画
   */
  static createPage() {
    const container = document.createElement('div');

    container.classList.add('container');
    container.innerHTML = `
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
      `;

    // configオブジェクト参照する要素を追加
    this.addConfigElement(container);

    this.createBrandModelArea();
    this.createBatteryListArea();

    config.accessoryPowerArea.addEventListener('change', () => {
      AppController.calculatePowerConsumptionView();
    });

    const target = document.getElementById('target');

    target.append(container);

    AppController.calculatePowerConsumptionView();
  }

  /**
   * select要素（電池の種類）の初期化処理
   */
  static createBrandModelArea() {
    // brandをキーに重複している要素を取り除く
    const brandArry = [...new Map(this.camera.map((item) => [item.brand, item])).values()];

    for (let i = 0; i < brandArry.length; i++) {
      config.brandArea.innerHTML += `
           <option value="${brandArry[i].brand}">${brandArry[i].brand}</option>
           `;
    }

    // 値を変更したときに発火するイベント
    config.brandArea.addEventListener('change', (event) => {
      AppController.selectBrand(event);
      AppController.calculatePowerConsumptionView();
    });
  }

  /**
   * select要素（電池のモデル）の初期化処理
   */
  static createBatteryListArea() {
    for (let i = 0; i < this.camera.length; i++) {
      if (this.camera[i]['brand'] === 'Cakon') {
        config.modelArea.innerHTML += `
          <option value="${this.camera[i]['model']}">${this.camera[i]['model']}</option>
          `;
      }
    }

    config.modelArea.addEventListener('change', () => {
      AppController.calculatePowerConsumptionView();
    });
  }

  /**
   * 新しいID要素をオブジェクトに追加する
   * @param {object} element - HTML要素
   */
  static addConfigElement(element) {
    config[`brandArea`] = element.querySelectorAll(`#brandArea`)[0];
    config[`modelArea`] = element.querySelectorAll(`#modelArea`)[0];
    config[`accessoryPowerArea`] = element.querySelectorAll(`#accessoryPowerArea`)[0];
    config[`batteryArea`] = element.querySelectorAll(`#batteryArea`)[0];
  }
}

/**
 * イベント発火時の処理や初期化時の処理をまとめたControllerクラス
 */
class AppController {
  /**
   * オブジェクトを格納
   */
  static battery = battery;

  /**
   * 電池のブランドを選択した際に実行する処理
   * @param {object} event - イベント
   */
  static selectBrand(event) {
    // select要素で選択された値を取得する
    const brandName = event.target.value;

    // ブランド名を元にcameraのデータから一致するものを抽出
    const newModelLists = camera.filter((item) => item.brand === brandName);

    config.modelArea.innerHTML = '';
    for (let i = 0; i < newModelLists.length; i++) {
      config.modelArea.innerHTML += `
        <option value="${newModelLists[i].model}">${newModelLists[i].model}</option>`;
    }
  }

  /**
   * 消費電力を元にバッテリーの持続時間を見積もった要素を描画する
   */
  static calculatePowerConsumptionView() {
    config.batteryArea.innerHTML = '';
    // batteryNameをキーにアルファベット順に並び替え
    const sortBattery = this.battery.sort((a, b) => (a.batteryName < b.batteryName ? -1 : 1));

    for (let i = 0; i < this.battery.length; i++) {
      if (AppController.IsSafetyVoltage(sortBattery[i])) {
        const estimate_hour = AppController.calcurateEstimate(sortBattery[i].voltage, sortBattery[i].capacityAh);
        config.batteryArea.innerHTML += `
          <div class="bg-light border d-flex justify-content-between">
            <div class="p-2 font-weight-bold">${sortBattery[i].batteryName}</div>
            <div class="p-2">Estimate ${estimate_hour} hours</div>
          </div>
          `;
      }
    }
  }

  /**
   * 許容電力か判定する
   * @param {*} batteryData - バッテリーデータ
   * @returns - boolean
   */
  static IsSafetyVoltage(batteryData) {
    const selectModel = config.modelArea;
    // 現在選択されているカメラのモデルより、カメラのデータを取得
    const filter_result = camera.filter((item) => item.model === selectModel.value);
    // アクセサリーの消費電力の数値入力欄を取得
    const accessory_power = parseInt(config.accessoryPowerArea.value);
    // アクセサリーの消費電力とカメラの消費電力を合計する
    const total_power_consumption = filter_result[0].powerConsumptionWh + accessory_power;
    // 電池の安全性を考慮した消費電力の値（この値を超える消費電力のカメラには対応していない）
    const safety_voltage = (batteryData.maxDraw * batteryData.endVoltage).toFixed(1);

    return total_power_consumption < parseInt(safety_voltage);
  }

  /**
   * バッテリーの持続時間を見積もる
   * @param {*} voltage
   * @param {*} capacityAh
   * @returns
   */
  static calcurateEstimate(voltage, capacityAh) {
    const selectModel = config.modelArea;
    // アクセサリーの消費電力の数値入力欄を取得
    const accessory_power = parseInt(config.accessoryPowerArea.value);
    // 現在選択されているカメラのモデルより、カメラのデータを取得
    const filter_result = camera.filter((item) => item.model === selectModel.value);
    // アクセサリーの消費電力とカメラの消費電力を合計する
    const total_power_consumption = filter_result[0].powerConsumptionWh + accessory_power;
    // 選択されている電池のブランドと、モデルを元に持続可能時間を計算する
    const sustainability = Math.round(((voltage * capacityAh) / total_power_consumption) * 10) / 10;

    // 固定小数点表記を用いて整形
    // INFO1: https://stackoverflow.com/questions/27834961/javascript-how-to-convert-number-1-0-to-string-1-0/27835002
    // INFO2: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
    return sustainability.toFixed(1);
  }
}

MainView.createPage();
