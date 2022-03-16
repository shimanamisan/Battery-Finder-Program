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
            id=""
            min="0"
            max="100"
            value="55"
        />
    </div>

    <div id="batteryArea">
        <p class="mb-0">Step4: Choose your battery</p>
        <div class="bg-light border d-flex justify-content-between">
            <div class="p-2 font-weight-bold">IOP-E140</div>
            <div class="p-2">Estimate 4.0 hours</div>
        </div>
        <div class="bg-light border d-flex justify-content-between">
            <div class="p-2 font-weight-bold">IOP-E140</div>
            <div class="p-2">Estimate 4.0 hours</div>
        </div>
        <div class="bg-light border d-flex justify-content-between">
            <div class="p-2 font-weight-bold">IOP-E140</div>
            <div class="p-2">Estimate 4.0 hours</div>
        </div>
        <div class="bg-light border d-flex justify-content-between">
            <div class="p-2 font-weight-bold">IOP-E140</div>
            <div class="p-2">Estimate 4.0 hours</div>
        </div>
        <div class="bg-light border d-flex justify-content-between">
            <div class="p-2 font-weight-bold">IOP-E140</div>
            <div class="p-2">Estimate 4.0 hours</div>
        </div>
        <div class="bg-light border d-flex justify-content-between">
            <div class="p-2 font-weight-bold">IOP-E140</div>
            <div class="p-2">Estimate 4.0 hours</div>
        </div>
        <div class="bg-light border d-flex justify-content-between">
            <div class="p-2 font-weight-bold">IOP-E140</div>
            <div class="p-2">Estimate 4.0 hours</div>
        </div>
        <div class="bg-light border d-flex justify-content-between">
            <div class="p-2 font-weight-bold">IOP-E140</div>
            <div class="p-2">Estimate 4.0 hours</div>
        </div>
        <div class="bg-light border d-flex justify-content-between">
            <div class="p-2 font-weight-bold">IOP-E140</div>
            <div class="p-2">Estimate 4.0 hours</div>
        </div>
    </div>
</div>
    `

}(target));

const accessDomLists = {
    brandArea: $.getElementById("brandArea"),
    modelArea: $.getElementById("modelArea"),
    batteryArea: $.getElementById("batteryArea"),
}

class Brand {
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
            Calculate.allCalcurate(event);
        });
    }
}

class BatteryModel {
    static initialize(brand) {
        const target = accessDomLists.modelArea;

        for (let i = 0; i < camera.length; i++) {
            if (camera[i]["brand"] === brand) {
                target.innerHTML += `
                    <option value="${camera[i]["model"]}">${camera[i]["model"]}</option>
                `
            }
        }
    }
}

class ChooseBatteryView {

    static createBatteryList() {
        const target = $.accessDomLists.batteryArea;
    }
}

class Calculate {

    // 計算された結果を格納する配列
    static calculate_result = [];

    static selectBrand(event) {
        this.calculate_result = [];

        // select要素で選択された値を取得する
        let brand_name = event.target.value;

        // ブランド名を元にcameraのデータから一致するものを抽出
        let new_model_lists = camera.filter((item) => item.brand === brand_name);

        this.calculate_result.push(...new_model_lists);

        const target = accessDomLists.modelArea;
        target.innerHTML = "";
        for (let i = 0; i < new_model_lists.length; i++) {
            target.innerHTML += `
            <option value="${new_model_lists[i].model}">${new_model_lists[i].model}</option>
            `
        }

    }

    static selectModel() {

    }

    static selectInputPowerConsumption() {

    }

    static allCalcurate(event) {

        for (let i = 0; i < this.calculate_result.length; i++) {
            console.log(this.calculate_result[i].powerConsumptionWh)
        }
    }
}

Brand.initialize();
BatteryModel.initialize("Cakon")