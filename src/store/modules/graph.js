import {GetGraphAPI} from "../../api/graph"
const graph={
    state:{
        graphList:[],
        isInit:false,
        question: ''
    },
    mutations:{
        set_graphList:function(state,data){
            state.graphList=data
        },
        set_isInit:function(state,data){
            state.isInit=data
        },
        set_question:function (state, data) {
            console.log('set: ' + data)
            state.question = data
            console.log('set: ' + state.question)
        }
    },
    actions:{
        async getGraph({commit}){
            await GetGraphAPI({id:4})
            .then((res) => {
                var graph =res.content
                var graphList = []
                var edgeId = 0
                for (var item in graph) {
                    var node=graph[item]
                    console.log(node)
                    const data = {}
                    if(node.group == 'nodes'){
                        data.id = node.data.name
                        data.name = node.data.name
                        data.labels = node.data.content
                    }
                    else{
                        data.id = edgeId
                        edgeId++
                        data.name = node.name
                        data.labels = node.content
                    }
                    const toBeAdded = {
                        group: node.group,
                        data,
                        classes: "1",
                    }
                    // if(node.group=='nodes'){
                    //     if (node.position.x != null && node.position.y != null) {
                    //         toBeAdded.position = {
                    //             x: parseFloat(node.position.x),
                    //             y: parseFloat(node.position.y)
                    //         }
                    //     }
                    // }
                    if(node.group=='edges'){
                        toBeAdded.data.source=node.source
                        toBeAdded.data.target=node.target
                    }
                    console.log(toBeAdded.position)
                    graphList.push(toBeAdded)
                }
                console.log("graph",graphList)
                    // {"1":graphList,"2":graphList,..}

                var mygraph=graphList
                console.log(mygraph)
                // var isInit=false
                commit("set_graphList",mygraph)
              })
            .catch((err) => console.log(err));

            // var res={
            //     "success": true,
            //     "message": null,
            //     "content": [
            //         {
            //             "nodes": [
            //                 {
            //                     "identity": 53571,
            //                     "labels": [
            //                         "医用诊疗设备"
            //                     ],
            //                     "properties": {
            //                         "name": "外循环及血液处理设备",
            //                         "x": "880.8942372569195",
            //                         "y": "994.440155759884",
            //                         "id": "https://covid-19.aminer.cn/kg/class/external_circulation_and_blood_processing_equipment"
            //                     },
            //                     "cls": 1
            //                 },
            //                 {
            //                     "identity": 65406,
            //                     "labels": [
            //                         "药物"
            //                     ],
            //                     "properties": {
            //                         "name": "淫羊藿酒（一）",
            //                         "id": "https://covid-19.aminer.cn/kg/resource/R17264"
            //                     },
            //                     "cls": 2
            //                 },
            //                 {
            //                     "identity": 60822,
            //                     "labels": [
            //                         "疾病"
            //                     ],
            //                     "properties": {
            //                         "name": "肾上腺性征异常症",
            //                         "id": "https://covid-19.aminer.cn/kg/resource/R10010"
            //                     },
            //                     "cls": 3
            //                 },
            //                 {
            //                     "identity": 53570,
            //                     "labels": [
            //                         "氧疗设备"
            //                     ],
            //                     "properties": {
            //                         "x": "547.314307611674",
            //                         "name": "高流量鼻导管氧疗机",
            //                         "y": "773.5202476039858",
            //                         "id": "https://covid-19.aminer.cn/kg/class/high_flow_nasal_catheter_oxygen_therapy_machine"
            //                     },
            //                     "cls": 4
            //                 },
            //                 {
            //                     "identity": 72388,
            //                     "labels": [],
            //                     "properties": {
            //                         "name": "唇炎",
            //                         "id": "https://covid-19.aminer.cn/kg/resource/R2169"
            //                     },
            //                     "cls": 0
            //                 },
            //                 {
            //                     "identity": 65296,
            //                     "labels": [
            //                         "药物"
            //                     ],
            //                     "properties": {
            //                         "name": "十一味斑蝥丸",
            //                         "id": "https://covid-19.aminer.cn/kg/resource/R17083"
            //                     },
            //                     "cls": 2
            //                 },
            //                 {
            //                     "identity": 53565,
            //                     "labels": [
            //                         "氧疗设备"
            //                     ],
            //                     "properties": {
            //                         "x": "334.03814768644963",
            //                         "name": "吸氧面罩",
            //                         "y": "485.7137731978514",
            //                         "id": "https://covid-19.aminer.cn/kg/class/oxygen_mask"
            //                     },
            //                     "cls": 4
            //                 },
            //                 {
            //                     "identity": 53583,
            //                     "labels": [
            //                         "外循环及血液处理设备"
            //                     ],
            //                     "properties": {
            //                         "x": "772.4010944008505",
            //                         "name": "术中自体血液回输机",
            //                         "y": "998.5087123915306",
            //                         "id": "https://covid-19.aminer.cn/kg/class/autologous_blood_transfusion_machine"
            //                     },
            //                     "cls": 5
            //                 },
            //                 {
            //                     "identity": 53585,
            //                     "labels": [
            //                         "外循环及血液处理设备"
            //                     ],
            //                     "properties": {
            //                         "name": "血液净化体外循环血路",
            //                         "x": "853.8035790721192",
            //                         "y": "929.7157368684852",
            //                         "id": "https://covid-19.aminer.cn/kg/class/blood_purification_extracorporeal_circulation_blood_circuit"
            //                     },
            //                     "cls": 5
            //                 },
            //                 {
            //                     "identity": 60822,
            //                     "labels": [
            //                         "疾病"
            //                     ],
            //                     "properties": {
            //                         "name": "肾上腺性征异常症",
            //                         "id": "https://covid-19.aminer.cn/kg/resource/R10010"
            //                     },
            //                     "cls": 3
            //                 },
            //                 {
            //                     "identity": 53565,
            //                     "labels": [
            //                         "氧疗设备"
            //                     ],
            //                     "properties": {
            //                         "x": "334.03814768644963",
            //                         "name": "吸氧面罩",
            //                         "y": "485.7137731978514",
            //                         "id": "https://covid-19.aminer.cn/kg/class/oxygen_mask"
            //                     },
            //                     "cls": 4
            //                 },
            //                 {
            //                     "identity": 53584,
            //                     "labels": [
            //                         "外循环及血液处理设备"
            //                     ],
            //                     "properties": {
            //                         "x": "787.9588116388406",
            //                         "name": "血浆分离器",
            //                         "y": "1056.6894771658187",
            //                         "id": "https://covid-19.aminer.cn/kg/class/plasma_separator"
            //                     },
            //                     "cls": 5
            //                 },
            //                 {
            //                     "identity": 53581,
            //                     "labels": [
            //                         "外循环及血液处理设备"
            //                     ],
            //                     "properties": {
            //                         "x": "959.8898063913755",
            //                         "name": "吸附器",
            //                         "y": "927.318151746964",
            //                         "id": "https://covid-19.aminer.cn/kg/class/adsorber"
            //                     },
            //                     "cls": 5
            //                 },
            //                 {
            //                     "identity": 53564,
            //                     "labels": [
            //                         "氧疗设备"
            //                     ],
            //                     "properties": {
            //                         "x": "608.031743867757",
            //                         "name": "体外膜肺氧合机",
            //                         "y": "887.9442418874364",
            //                         "id": "https://covid-19.aminer.cn/kg/class/extracorporeal_lung_oxygenator"
            //                     },
            //                     "cls": 4
            //                 },
            //                 {
            //                     "identity": 53568,
            //                     "labels": [
            //                         "氧疗设备"
            //                     ],
            //                     "properties": {
            //                         "x": "624.0970245397607",
            //                         "name": "呼吸机",
            //                         "y": "695.578320622477",
            //                         "id": "https://covid-19.aminer.cn/kg/class/ventilator"
            //                     },
            //                     "cls": 4
            //                 },
            //                 {
            //                     "identity": 61395,
            //                     "labels": [
            //                         "疾病"
            //                     ],
            //                     "properties": {
            //                         "name": "幼年型关节强硬性脊椎",
            //                         "id": "https://covid-19.aminer.cn/kg/resource/R10871"
            //                     },
            //                     "cls": 3
            //                 },
            //                 {
            //                     "identity": 72387,
            //                     "labels": [],
            //                     "properties": {
            //                         "name": "夏季感冒",
            //                         "id": "https://covid-19.aminer.cn/kg/resource/R2165"
            //                     },
            //                     "cls": 0
            //                 },
            //                 {
            //                     "identity": 53556,
            //                     "labels": [
            //                         "物资"
            //                     ],
            //                     "properties": {
            //                         "x": "774.7457621021315",
            //                         "name": "医用诊疗设备",
            //                         "y": "867.2084267101152",
            //                         "id": "https://covid-19.aminer.cn/kg/class/medical_instruments"
            //                     },
            //                     "cls": 6
            //                 },
            //                 {
            //                     "identity": 53579,
            //                     "labels": [
            //                         "外循环及血液处理设备"
            //                     ],
            //                     "properties": {
            //                         "x": "864.1296877434879",
            //                         "name": "中空纤维透析器",
            //                         "y": "1064.2259686604184",
            //                         "id": "https://covid-19.aminer.cn/kg/class/hollow_fiber_dialyzer"
            //                     },
            //                     "cls": 5
            //                 },
            //                 {
            //                     "identity": 53582,
            //                     "labels": [
            //                         "外循环及血液处理设备"
            //                     ],
            //                     "properties": {
            //                         "x": "912.9234508961097",
            //                         "name": "多层平板型透析器",
            //                         "y": "874.3363107272619",
            //                         "id": "https://covid-19.aminer.cn/kg/class/multi-layer_flat_dialyzer"
            //                     },
            //                     "cls": 5
            //                 },
            //                 {
            //                     "identity": 53576,
            //                     "labels": [
            //                         "外循环及血液处理设备"
            //                     ],
            //                     "properties": {
            //                         "x": "1006.3172895156818",
            //                         "name": "血液透析装置",
            //                         "y": "1023.4361542053654",
            //                         "id": "https://covid-19.aminer.cn/kg/class/hemodialysis_device"
            //                     },
            //                     "cls": 5
            //                 },
            //                 {
            //                     "identity": 66701,
            //                     "labels": [
            //                         "药物"
            //                     ],
            //                     "properties": {
            //                         "name": "阿米卡霉素",
            //                         "id": "https://covid-19.aminer.cn/kg/resource/R19410"
            //                     },
            //                     "cls": 2
            //                 },
            //                 {
            //                     "identity": 53567,
            //                     "labels": [
            //                         "氧疗设备"
            //                     ],
            //                     "properties": {
            //                         "x": "554.8494554488475",
            //                         "name": "吸氧鼻罩",
            //                         "y": "705.5043788261215",
            //                         "id": "https://covid-19.aminer.cn/kg/class/oxygen_nasal_mask"
            //                     },
            //                     "cls": 4
            //                 },
            //                 {
            //                     "identity": 65296,
            //                     "labels": [
            //                         "药物"
            //                     ],
            //                     "properties": {
            //                         "name": "十一味斑蝥丸",
            //                         "id": "https://covid-19.aminer.cn/kg/resource/R17083"
            //                     },
            //                     "cls": 2
            //                 },
            //                 {
            //                     "identity": 53575,
            //                     "labels": [
            //                         "外循环及血液处理设备"
            //                     ],
            //                     "properties": {
            //                         "x": "988.58503014739",
            //                         "name": "血液透析滤过装置",
            //                         "y": "1083.457533066403",
            //                         "id": "https://covid-19.aminer.cn/kg/class/hemodiafiltration_device"
            //                     },
            //                     "cls": 5
            //                 },
            //                 {
            //                     "identity": 76345,
            //                     "labels": [],
            //                     "properties": {
            //                         "name": "橘红痰咳泡腾片",
            //                         "id": "https://covid-19.aminer.cn/kg/resource/R14879"
            //                     },
            //                     "cls": 0
            //                 },
            //                 {
            //                     "identity": 53566,
            //                     "labels": [
            //                         "氧疗设备"
            //                     ],
            //                     "properties": {
            //                         "x": "692.7110895739022",
            //                         "name": "吸氧鼻导管",
            //                         "y": "704.7462856766194",
            //                         "id": "https://covid-19.aminer.cn/kg/class/oxygen_nasal_cannula"
            //                     },
            //                     "cls": 4
            //                 },
            //                 {
            //                     "identity": 72387,
            //                     "labels": [],
            //                     "properties": {
            //                         "name": "夏季感冒",
            //                         "id": "https://covid-19.aminer.cn/kg/resource/R2165"
            //                     },
            //                     "cls": 0
            //                 },
            //                 {
            //                     "identity": 71600,
            //                     "labels": [],
            //                     "properties": {
            //                         "name": "胸部外科",
            //                         "id": "https://covid-19.aminer.cn/kg/resource/R66"
            //                     },
            //                     "cls": 0
            //                 },
            //                 {
            //                     "identity": 53557,
            //                     "labels": [
            //                         "医用诊疗设备"
            //                     ],
            //                     "properties": {
            //                         "x": "688.9310309323125",
            //                         "name": "试剂盒",
            //                         "y": "921.5603871042381",
            //                         "id": "https://covid-19.aminer.cn/kg/class/kit"
            //                     },
            //                     "cls": 1
            //                 },
            //                 {
            //                     "identity": 53574,
            //                     "labels": [
            //                         "外循环及血液处理设备"
            //                     ],
            //                     "properties": {
            //                         "x": "808.4619971338411",
            //                         "name": "血液解毒器",
            //                         "y": "1116.2155048866525",
            //                         "id": "https://covid-19.aminer.cn/kg/class/blood_detoxifier"
            //                     },
            //                     "cls": 5
            //                 },
            //                 {
            //                     "identity": 53563,
            //                     "labels": [
            //                         "医用诊疗设备"
            //                     ],
            //                     "properties": {
            //                         "x": "642.07061342666",
            //                         "name": "氧疗设备",
            //                         "y": "794.4235772074019",
            //                         "id": "https://covid-19.aminer.cn/kg/class/oxygen_therapy_equipment"
            //                     },
            //                     "cls": 1
            //                 },
            //                 {
            //                     "identity": 76345,
            //                     "labels": [],
            //                     "properties": {
            //                         "name": "橘红痰咳泡腾片",
            //                         "id": "https://covid-19.aminer.cn/kg/resource/R14879"
            //                     },
            //                     "cls": 0
            //                 },
            //                 {
            //                     "identity": 53580,
            //                     "labels": [
            //                         "外循环及血液处理设备"
            //                     ],
            //                     "properties": {
            //                         "x": "787.4966143705449",
            //                         "name": "动静脉穿刺器",
            //                         "y": "938.8924988382264",
            //                         "id": "https://covid-19.aminer.cn/kg/class/arteriovenous_puncture"
            //                     },
            //                     "cls": 5
            //                 },
            //                 {
            //                     "identity": 53569,
            //                     "labels": [
            //                         "氧疗设备"
            //                     ],
            //                     "properties": {
            //                         "x": "711.1905324310333",
            //                         "name": "气管插管",
            //                         "y": "844.8901400291337",
            //                         "id": "https://covid-19.aminer.cn/kg/class/tracheal_intubation"
            //                     },
            //                     "cls": 4
            //                 },
            //                 {
            //                     "identity": 53573,
            //                     "labels": [
            //                         "外循环及血液处理设备"
            //                     ],
            //                     "properties": {
            //                         "x": "948.6723973525068",
            //                         "name": "血液滤过装置",
            //                         "y": "1010.8948624090337",
            //                         "id": "https://covid-19.aminer.cn/kg/class/hemofiltration_device"
            //                     },
            //                     "cls": 5
            //                 },
            //                 {
            //                     "identity": 53558,
            //                     "labels": [
            //                         "试剂盒"
            //                     ],
            //                     "properties": {
            //                         "name": "c反应蛋白检测试剂盒",
            //                         "x": "610.1881891592236",
            //                         "y": "992.5912294281217",
            //                         "id": "https://covid-19.aminer.cn/kg/class/c-reactive_protein_detection_kit"
            //                     },
            //                     "cls": 7
            //                 },
            //                 {
            //                     "identity": 53578,
            //                     "labels": [
            //                         "外循环及血液处理设备"
            //                     ],
            //                     "properties": {
            //                         "x": "849.0719261999452",
            //                         "name": "透析血路",
            //                         "y": "872.0193909746508",
            //                         "id": "https://covid-19.aminer.cn/kg/class/dialysis_blood"
            //                     },
            //                     "cls": 5
            //                 },
            //                 {
            //                     "identity": 65406,
            //                     "labels": [
            //                         "药物"
            //                     ],
            //                     "properties": {
            //                         "name": "淫羊藿酒（一）",
            //                         "id": "https://covid-19.aminer.cn/kg/resource/R17264"
            //                     },
            //                     "cls": 2
            //                 },
            //                 {
            //                     "identity": 53586,
            //                     "labels": [
            //                         "外循环及血液处理设备"
            //                     ],
            //                     "properties": {
            //                         "x": "874.0778782012726",
            //                         "name": "血液净化管路",
            //                         "y": "1126.9148109875696",
            //                         "id": "https://covid-19.aminer.cn/kg/class/blood_purification_circuit"
            //                     },
            //                     "cls": 5
            //                 },
            //                 {
            //                     "identity": 72388,
            //                     "labels": [],
            //                     "properties": {
            //                         "name": "唇炎",
            //                         "id": "https://covid-19.aminer.cn/kg/resource/R2169"
            //                     },
            //                     "cls": 0
            //                 },
            //                 {
            //                     "identity": 69070,
            //                     "labels": [
            //                         "药物"
            //                     ],
            //                     "properties": {
            //                         "x": "247.26809498855238",
            //                         "name": "盐酸安普乐定滴眼液",
            //                         "y": "465.08518948926746",
            //                         "id": "https://covid-19.aminer.cn/kg/resource/R23331"
            //                     },
            //                     "cls": 2
            //                 },
            //                 {
            //                     "identity": 53572,
            //                     "labels": [
            //                         "外循环及血液处理设备"
            //                     ],
            //                     "properties": {
            //                         "x": "930.3560518125535",
            //                         "name": "中空纤维滤过器",
            //                         "y": "1089.889594828237",
            //                         "id": "https://covid-19.aminer.cn/kg/class/hollow_fiber_filter"
            //                     },
            //                     "cls": 5
            //                 },
            //                 {
            //                     "identity": 53587,
            //                     "labels": [
            //                         "医用诊疗设备"
            //                     ],
            //                     "properties": {
            //                         "x": "830.589750048023",
            //                         "name": "常规检查设备",
            //                         "y": "769.7554531834439",
            //                         "id": "https://covid-19.aminer.cn/kg/class/general_inspection_equipment"
            //                     },
            //                     "cls": 1
            //                 },
            //                 {
            //                     "identity": 78206,
            //                     "labels": [],
            //                     "properties": {
            //                         "name": "水澄膏",
            //                         "id": "https://covid-19.aminer.cn/kg/resource/R20084"
            //                     },
            //                     "cls": 0
            //                 },
            //                 {
            //                     "identity": 53555,
            //                     "labels": [
            //                         "物资"
            //                     ],
            //                     "properties": {
            //                         "x": "485.2455447379889",
            //                         "name": "物资",
            //                         "y": "327.85541891502635",
            //                         "id": "https://covid-19.aminer.cn/kg/class/goods"
            //                     },
            //                     "cls": 6
            //                 },
            //                 {
            //                     "identity": 61395,
            //                     "labels": [
            //                         "疾病"
            //                     ],
            //                     "properties": {
            //                         "name": "幼年型关节强硬性脊椎",
            //                         "id": "https://covid-19.aminer.cn/kg/resource/R10871"
            //                     },
            //                     "cls": 3
            //                 },
            //                 {
            //                     "identity": 66701,
            //                     "labels": [
            //                         "药物"
            //                     ],
            //                     "properties": {
            //                         "name": "阿米卡霉素",
            //                         "id": "https://covid-19.aminer.cn/kg/resource/R19410"
            //                     },
            //                     "cls": 2
            //                 },
            //                 {
            //                     "identity": 78206,
            //                     "labels": [],
            //                     "properties": {
            //                         "name": "水澄膏",
            //                         "id": "https://covid-19.aminer.cn/kg/resource/R20084"
            //                     },
            //                     "cls": 0
            //                 },
            //                 {
            //                     "identity": 53577,
            //                     "labels": [
            //                         "外循环及血液处理设备"
            //                     ],
            //                     "properties": {
            //                         "x": "1014.3714899238087",
            //                         "name": "血路塑料泵管",
            //                         "y": "963.1030177079197",
            //                         "id": "https://covid-19.aminer.cn/kg/class/blood_circuit_plastic_pump_tube"
            //                     },
            //                     "cls": 5
            //                 }
            //             ],
            //             "edges": [
            //                 {
            //                     "identity": 6765,
            //                     "start": 53583,
            //                     "end": 53571,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6755,
            //                     "start": 53573,
            //                     "end": 53571,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6738,
            //                     "start": 53556,
            //                     "end": 53555,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6753,
            //                     "start": 53571,
            //                     "end": 53556,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6739,
            //                     "start": 53557,
            //                     "end": 53556,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6749,
            //                     "start": 53567,
            //                     "end": 53563,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6762,
            //                     "start": 53580,
            //                     "end": 53571,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 8558,
            //                     "start": 53557,
            //                     "end": 69070,
            //                     "type": "jkerrjel",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6740,
            //                     "start": 53558,
            //                     "end": 53557,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6764,
            //                     "start": 53582,
            //                     "end": 53571,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6752,
            //                     "start": 53570,
            //                     "end": 53563,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6768,
            //                     "start": 53586,
            //                     "end": 53571,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6751,
            //                     "start": 53569,
            //                     "end": 53563,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6766,
            //                     "start": 53584,
            //                     "end": 53571,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6760,
            //                     "start": 53578,
            //                     "end": 53571,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6757,
            //                     "start": 53575,
            //                     "end": 53571,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6759,
            //                     "start": 53577,
            //                     "end": 53571,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6767,
            //                     "start": 53585,
            //                     "end": 53571,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6756,
            //                     "start": 53574,
            //                     "end": 53571,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6747,
            //                     "start": 53565,
            //                     "end": 53563,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6750,
            //                     "start": 53568,
            //                     "end": 53563,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6745,
            //                     "start": 53563,
            //                     "end": 53556,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6769,
            //                     "start": 53587,
            //                     "end": 53556,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6758,
            //                     "start": 53576,
            //                     "end": 53571,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6763,
            //                     "start": 53581,
            //                     "end": 53571,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6748,
            //                     "start": 53566,
            //                     "end": 53563,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6746,
            //                     "start": 53564,
            //                     "end": 53563,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6761,
            //                     "start": 53579,
            //                     "end": 53571,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 },
            //                 {
            //                     "identity": 6754,
            //                     "start": 53572,
            //                     "end": 53571,
            //                     "type": "subClassOf",
            //                     "properties": {}
            //                 }
            //             ],
            //             "id": 0
            //         }
            //     ]
            // }
        }
    }
}
export default graph
