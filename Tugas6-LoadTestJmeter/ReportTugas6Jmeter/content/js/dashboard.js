/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9156327543424317, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "/list-merchant"], "isController": false}, {"data": [0.9833333333333333, 500, 1500, "/merchant/product"], "isController": false}, {"data": [1.0, 500, 1500, "/detail-product"], "isController": false}, {"data": [1.0, 500, 1500, "/dicovery-personalized-ads"], "isController": false}, {"data": [0.48936170212765956, 500, 1500, "/topup"], "isController": false}, {"data": [1.0, 500, 1500, "/pay"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "/review-product"], "isController": false}, {"data": [1.0, 500, 1500, "/checkout-list"], "isController": false}, {"data": [1.0, 500, 1500, "/official-store"], "isController": false}, {"data": [1.0, 500, 1500, "/promo"], "isController": false}, {"data": [0.9833333333333333, 500, 1500, "/discussion"], "isController": false}, {"data": [1.0, 500, 1500, "/add-to-cart"], "isController": false}, {"data": [0.9893617021276596, 500, 1500, "/dicovery-diskon"], "isController": false}, {"data": [0.75, 500, 1500, "/list-product"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 403, 0, 0.0, 464.24317617865984, 293, 1720, 338.0, 1088.0, 1119.8, 1307.4399999999996, 3.9729092934530787, 74.33981305822826, 0.6944831675079113], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/list-merchant", 30, 0, 0.0, 339.5, 307, 410, 329.5, 403.6, 407.8, 410.0, 0.3091285665708368, 5.784185916360114, 0.05403712247673808], "isController": false}, {"data": ["/merchant/product", 30, 0, 0.0, 349.1666666666667, 300, 667, 337.5, 369.8, 520.1499999999999, 667.0, 0.3089948397861756, 5.781945238389519, 0.054013746407934986], "isController": false}, {"data": ["/detail-product", 30, 0, 0.0, 344.53333333333336, 309, 411, 337.0, 398.7, 406.6, 411.0, 0.3089948397861756, 5.781985472092616, 0.054013746407934986], "isController": false}, {"data": ["/dicovery-personalized-ads", 47, 0, 0.0, 340.63829787234044, 301, 496, 337.0, 370.2, 398.2, 496.0, 0.4843213833043084, 9.06245934469771, 0.08466164805807734], "isController": false}, {"data": ["/topup", 47, 0, 0.0, 1132.063829787234, 1056, 1720, 1106.0, 1175.6000000000001, 1400.999999999999, 1720.0, 0.47932771738021906, 8.96891994780937, 0.0837887318467375], "isController": false}, {"data": ["/pay", 1, 0, 0.0, 499.0, 499, 499, 499.0, 499.0, 499.0, 499.0, 2.004008016032064, 37.48904058116233, 0.35030999498997994], "isController": false}, {"data": ["/review-product", 30, 0, 0.0, 348.83333333333326, 306, 574, 333.0, 383.0, 534.4, 574.0, 0.3088962108731466, 5.779999131229407, 0.053996505611614495], "isController": false}, {"data": ["/checkout-list", 2, 0, 0.0, 315.0, 293, 337, 315.0, 337.0, 337.0, 337.0, 0.038810835985407126, 0.7261681758421952, 0.006784316056042848], "isController": false}, {"data": ["/official-store", 47, 0, 0.0, 345.3617021276596, 309, 498, 337.0, 405.00000000000006, 456.1999999999997, 498.0, 0.48421161077628394, 9.060737328079123, 0.08464245930561995], "isController": false}, {"data": ["/promo", 30, 0, 0.0, 340.5, 302, 497, 329.0, 402.5, 451.3499999999999, 497.0, 0.30907124092103233, 5.78306297648483, 0.054027101684438264], "isController": false}, {"data": ["/discussion", 30, 0, 0.0, 341.79999999999995, 317, 530, 330.0, 384.2000000000001, 480.49999999999994, 530.0, 0.309033035631509, 5.782267636129053, 0.0540204232207423], "isController": false}, {"data": ["/add-to-cart", 2, 0, 0.0, 311.5, 310, 313, 311.5, 313.0, 313.0, 313.0, 0.038828919779451736, 0.7265065317523491, 0.006787477188009629], "isController": false}, {"data": ["/dicovery-diskon", 47, 0, 0.0, 337.04255319148933, 308, 509, 329.0, 361.0, 401.0, 509.0, 0.48422158804075704, 9.06083347606709, 0.08464420337821826], "isController": false}, {"data": ["/list-product", 30, 0, 0.0, 737.2666666666667, 309, 1355, 728.5, 1159.6000000000001, 1321.45, 1355.0, 0.3090394025238218, 5.782537664177182, 0.054021536183363375], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 403, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
