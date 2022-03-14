const $ = document;
const target = $.getElementById("target");

// 初期化処理
(function (target) {
    target.innerHTML = `
<div class="container">
    <p class="mb-0">Step1: Select your brand</p>
    <div class="mb-4">
        <select name="" id="brandArea">
            <option value="Cakon" selected>Cakon</option>
            <option value="Go MN">Go MN</option>
            <option value="VANY">VANY</option>
        </select>
    </div>

    <p class="mb-0">Step2: Select your model</p>
    <div class="mb-4">
        <select name="" id="modelArea">
            <option value="ABC 3000M" selected>ABC 3000M</option>
            <option value="ABC 5000M">ABC 5000M</option>
            <option value="ABC 7000M">ABC 7000M</option>
            <option value="ABC 9000M">ABC 9000M</option>
            <option value="ABC 9900M">ABC 9900M</option>
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
    brandArea: $.getElementById("modelArea"),
    brandArea: $.getElementById("batteryArea"),
}

const battery =
    [
        {
            "batteryName": "WKL-78", // 電池名
            "capacityAh": 2.3, // 容量（Ah）
            "voltage": 14.4,   // 電圧
            "maxDraw": 3.2,    // 最大放電電流
            "endVoltage": 10,  // 終止電圧
        },
        {
            "batteryName": "WKL-140",
            "capacityAh": 4.5,
            "voltage": 14.4,
            "maxDraw": 9.2,
            "endVoltage": 5,
        },
        {
            "batteryName": "Wmacro-78",
            "capacityAh": 2.5,
            "voltage": 14.5,
            "maxDraw": 10,
            "endVoltage": 5,
        },
        {
            "batteryName": "Wmacro-140",
            "capacityAh": 3.6,
            "voltage": 14.4,
            "maxDraw": 14,
            "endVoltage": 5,
        },
        {
            "batteryName": "IOP-E78",
            "capacityAh": 6.6,
            "voltage": 14.4,
            "maxDraw": 10.5,
            "endVoltage": 8,
        },
        {
            "batteryName": "IOP-E140",
            "capacityAh": 9.9,
            "voltage": 14.4,
            "maxDraw": 14,
            "endVoltage": 10,
        },
        {
            "batteryName": "IOP-E188",
            "capacityAh": 13.2,
            "voltage": 14.4,
            "maxDraw": 14,
            "endVoltage": 11,
        },
        {
            "batteryName": "RYN-C65",
            "capacityAh": 4.9,
            "voltage": 14.8,
            "maxDraw": 4.9,
            "endVoltage": 11,
        },
        {
            "batteryName": "RYN-C85",
            "capacityAh": 6.3,
            "voltage": 14.4,
            "maxDraw": 6.3,
            "endVoltage": 12,
        },
        {
            "batteryName": "RYN-C140",
            "capacityAh": 9.8,
            "voltage": 14.8,
            "maxDraw": 10,
            "endVoltage": 12,
        },
        {
            "batteryName": "RYN-C290",
            "capacityAh": 19.8,
            "voltage": 14.4,
            "maxDraw": 14,
            "endVoltage": 12,
        }]
    ;

const camera =
    [
        {
            "brand": "Cakon", // メーカー
            "model": "ABC 3000M", // 製品名
            "powerConsumptionWh": 35.5, // カメラの消費電力
        },
        {
            "brand": "Cakon",
            "model": "ABC 5000M",
            "powerConsumptionWh": 37.2,
        },
        {
            "brand": "Cakon",
            "model": "ABC 7000M",
            "powerConsumptionWh": 39.7,
        },
        {
            "brand": "Cakon",
            "model": "ABC 9000M",
            "powerConsumptionWh": 10.9,
        },
        {
            "brand": "Cakon",
            "model": "ABC 9900M",
            "powerConsumptionWh": 15.7,
        },
        {
            "brand": "Go MN",
            "model": "UIK 110C",
            "powerConsumptionWh": 62.3,
        },
        {
            "brand": "Go MN",
            "model": "UIK 210C",
            "powerConsumptionWh": 64.3,
        },
        {
            "brand": "Go MN",
            "model": "UIK 230C",
            "powerConsumptionWh": 26.3,
        },
        {
            "brand": "Go MN",
            "model": "UIK 250C",
            "powerConsumptionWh": 15.3,
        },
        {
            "brand": "Go MN",
            "model": "UIK 270C",
            "powerConsumptionWh": 20.3,
        },
        {
            "brand": "VANY",
            "model": "CEV 1100P",
            "powerConsumptionWh": 22,
        },
        {
            "brand": "VANY",
            "model": "CEV 1300P",
            "powerConsumptionWh": 23,
        },
        {
            "brand": "VANY",
            "model": "CEV 1500P",
            "powerConsumptionWh": 24,
        },
        {
            "brand": "VANY",
            "model": "CEV 1700P",
            "powerConsumptionWh": 25,
        },
        {
            "brand": "VANY",
            "model": "CEV 1900P",
            "powerConsumptionWh": 26,
        }]
    ;

