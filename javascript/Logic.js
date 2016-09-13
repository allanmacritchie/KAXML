var xmlData;
var xmlURI = "./xml/Logic.xml";
$.get({
    url: xmlURI,
    data: "result",
    dataType: "xml",
    success: function (data) {
        console.log(data);
        var xmlData = JSON.stringify(data);
        console.log(xmlData);
        parseDOM(data = this.xmlData);
    }
});
function parseDOM(data) {
    console.log('Parse of DOM Initiated');
    var parser = new DOMParser();
    xmlLogic = parser.parseFromString(xmlData, "text/xml");
    var tags = xmlLogic.getElementsByTagName('*');
    $(document).ready(function () {
        for (var i0 = 0; i0 < tags.length; i0++) {
            switch (tags[i0].nodeName) {
                case "agent":
                    addAgent(tags[i0].getAttribute("brand"), tags[i0].getAttribute("name"), tags[i0].getAttribute("status"));
                    break;
                case "Button":
                    addButton(tags[i0].getAttribute("classes"), tags[i0].getAttribute("forPanel"), tags[i0].getAttribute("id"), tags[i0].getAttribute("name"), tags[i0].getAttribute("state"));
                    break;
                case "script":
                    addTitle(tags[i0].getAttribute("classes"), tags[i0].getAttribute("title"), tags[i0].getAttribute("versionInfo"));
                    break;
                case "panel":
                    addPanels(tags[i0].getAttribute("classes"), tags[i0].getAttribute("name"), tags[i0].getAttribute("state"), tags[i0].getAttribute("title"));
                    break;
                case "image":
                    addImage(tags[i0].getAttribute("altText"), tags[i0].getAttribute("classes"), tags[i0].getAttribute("forPanel"), tags[i0].getAttribute("id"), tags[i0].getAttribute("src"));
                    break;
                case "dropdown":
                    addDropdown(tags[i0].getAttribute("classes"), tags[i0].getAttribute("id"), tags[i0].getAttribute("forPanel"), tags[i0].getAttribute("prefix"), tags[i0].getAttribute("prefixClasses"));
                    break;
                case "option":
                    addOption(tags[i0].getAttribute("choice"), tags[i0].getAttribute("dropdown"));
                    break;
                case "inputField":
                    if (tags[i0].getAttribute("type") === "text" || "email" || "password" || "number" || "tel") {
                        addTextField(tags[i0].getAttribute("classes"), tags[i0].getAttribute("id"), tags[i0].getAttribute("forPanel"), tags[i0].getAttribute("prefix"), tags[i0].getAttribute("prefixClasses"), tags[i0].getAttribute("type"));
                    }
                    break;
                case "datagrid":
                    addDatagrid(tags[i0].getAttribute("classes"), tags[i0].getAttribute("forPanel"), tags[i0].getAttribute("id"), tags[i0].getAttribute("prefix"), tags[i0].getAttribute("prefixClasses"));
                    break;
            }
        }
        function addTitle(classes, title) {
            var a0 = '<h1 class="' + classes + '"> ' + title + '</h1>';
            var b0 = "#title";
            $(b0).append(a0);
        }

        function addAgent(brand, name, status) {
            var a1 = '<span class="' + brand + ' col-xs-4 text-right" id = "' + brand + '"><strong>' + name + '</strong></span><span class="col-xs-4 text-center ' + brand + ' ">' + brand + '</span><span class="col-xs-4 text-left">' + status + '</span>';
            var b2 = "#agentDetails";
            $(b2).append(a1);
        }

        function addPanels(classes, name, state, title) {
            if (state === "chromeless") {
                //noinspection JSDuplicatedDeclaration
                var a2 = '<div id="' + name + 'Panel"><div class="row lineSpacing" id="' + name + 'Row1"></div><div class="row lineSpacing" id="' + name + 'Row2"></div><div class="row lineSpacing" id="' + name + 'Row3"></div><div class="row lineSpacing" id="' + name + 'Row4"></div><div class="row lineSpacing" id="' + name + 'Row5"></div></div>';
            } else {
                //noinspection JSDuplicatedDeclaration
                var a2 = '<div class="panel ' + classes + '" id="' + name + 'Panel"><h2 class="panelName row text-center">' + title + ':</h2><div class="row lineSpacing" id="' + name + 'Row1"></div><div class="row lineSpacing" id="' + name + 'Row2"></div><div class="row lineSpacing" id="' + name + 'Row3"></div><div class="row lineSpacing" id="' + name + 'Row4"></div><div class="row lineSpacing" id="' + name + 'Row5"></div></fieldset>';
            }
            var b2 = "#scriptPanels";
            $(b2).append(a2);
        }

        function addButton(classes, forPanel, id, name, state) {
            var a3 = '<button ID="' + id + '" class= "btn ' + classes + ' ' + state + '" >' + name + '</span>' + '</button>';
            var b3 = '#' + forPanel;
            $(b3).append(a3);
        }

        function addTextField(classes, id, forPanel, prefix, prefixClasses, type) {
            var a4 = '<label for="' + id + '" class=' + prefixClasses + ' >' + prefix + ': </label><input type="' + type + '" id="' + id + '" class="' + classes + '">';
            var b4 = '#' + forPanel;
            $(b4).append(a4);
        }

        function addDropdown(classes, id, forPanel, prefix, prefixClasses) {
            var a5 = '<label for="' + id + '" class="' + prefixClasses + '">' + prefix + '</label><select id="' + id + '" class="' + classes + '"></select>';
            var b5 = '#' + forPanel;
            $(b5).append(a5);
        }

        function addOption(choice, dropdown) {
            var a6 = '<option value="' + choice + '">' + choice + '</option>';
            var b6 = '#' + dropdown;
            $(b6).append(a6);
        }

        function addImage(altText, classes, forPanel, id, src) {
            var a7 = '<img src="' + src + '" id="' + id + '" alt="' + altText + '" class="' + classes + '">';
            var b7 = '#' + forPanel;
            $(b7).append(a7);
        }

        function addDatagrid(classes, forPanel, id, prefix, prefixClasses) {
            var a8 = '<p class="' + prefixClasses + '">' + prefix + '</p><div class="' + classes + '" id="jsGrid"></div>';
            var b8 = '#' + forPanel;
            $(b8).append(a8);
        }
    });
}
function logicEngine(triggerType) {
    $(document).ready(function () {
        if (triggerType === "initiatePanels") {
            var parser = new DOMParser();
            LogicXML = parser.parseFromString(xmlData, "text/xml");
            var tags = LogicXML.getElementsByTagName('*');
            for (var i2 = "0"; i2 < tags.length; i2++) {
                var elementName = '#' + tags[i2].getAttribute("name");
                if (tags[i2].nodeName === "panel") {
                    if (tags[i2].getAttribute("initial") === "show") {
                        eval('$("' + elementName + 'Panel").show();');
                    } else if (tags[i2].getAttribute("initial") === "hide") {
                        eval('$("' + elementName + 'Panel").hide();');
                    }
                }
            }
        }
        if (triggerType === "buttontrigger") {
            var parser = new DOMParser();
            LogicXML = parser.parseFromString(xmlData, "text/xml");
            var tags = LogicXML.getElementsByTagName('*');
            for (var i3 = "0"; i3 < tags.length; i3++) {
                if (tags[i3].nodeName === "hide" && tags[i3].getAttribute("triggerID") === id) {
                    eval('$("#' + tags[i3].getAttribute("element") + '").hide();');
                } else if (tags[i3].nodeName === "show" && tags[i3].getAttribute("triggerID") === id) {
                    eval('$("#' + tags[i3].getAttribute("element") + '").show();')
                } else if (tags[i3].nodeName === "registerOutcome" && tags[i3].getAttribute("triggerID") === id) {
                    alert('Outcome registered as ' + tags[i3].getAttribute("message"));
                } else if (tags[i3].nodeName === "rules" && tags[i3].getAttribute("triggerID") === id) {
                    eval(tags[i3].getAttribute('command') + '()');
                }
            }
        }
    });
}
logicEngine(triggerType = "initiatePanels");
// Workers
//Timer
/*var w0;
function startTimer() {
    if (typeof(Worker) !== "undefined") {
        if (typeof(w0) == "undefined") {
            w0 = new Worker("javascript/timer.js");
        }
        w0.onmessage = function (event) {
            document.getElementById("Timer").innerHTML = event.data;
        };
    } else {
        document.getElementById("Timer").innerHTML = "Timer not operational on your browser";
    }
}
var Timings = [];
function stopTimer() {
    w0.terminate();
    w0 = undefined;
}
var blocker0 = "0";
var blocker1 = "0";
var blocker2 = "0";
var blocker3 = "0";
function endCall() {
    if (blocker2 === "0") {
        blocker0 = "1";
        blocker1 = "1";
        blocker2 = "1";
        blocker3 = "2";
        stopTimer();
        $("#timerText").text('In wrap for:');
        $("#makeNewCall").toggleClass("disabled");
        $("#endCall").text('Call Ended').toggleClass("disabled").toggleClass('btn-danger');
        $("#transferCall").toggleClass("disabled");
        $("#holdCall").toggleClass("disabled");
        startTimer();
        blocker1 = "1";
    }
}
function holdCall() {
    switch (blocker1) {
        case "0":
            blocker0 = "1";
            blocker1 = "2";
            blocker2 = "1";
            blocker3 = "0";
            stopTimer();
            $("#timerText").text('Call on hold for:');
            $("#holdCall").text('Resume Call').toggleClass('btn-success');
            $("#endCall").toggleClass("disabled");
            $("#transferCall").toggleClass("disabled");
            startTimer();
            break;
        case "2":
            stopTimer();
            blocker0 = "0";
            blocker1 = "0";
            blocker2 = "0";
            blocker3 = "0";
            $("#timerText").text('Time on current call:');
            $("#holdCall").text('Place Call on Hold').toggleClass('btn-success');
            $("#endCall").toggleClass("disabled");
            $("#transferCall").toggleClass("disabled");
            startTimer();
            break;
    }
}
function newCall() {
    if (blocker3 === "0") {
        alert('Currently in a call');
    } else if (blocker3 === "2") {
        window.location.reload(false);
    }
}
function transferCall() {
    if (blocker0 === "0") {
        blocker0 = "1";
        blocker1 = "1";
        blocker2 = "1";
        blocker3 = "2";
        $("#timerText").text('Time in wrap :');
        $("#transferCall").text('Call transfered').toggleClass('disabled').toggleClass('btn-danger');
        $("#holdCall").toggleClass('disabled');
        $("#endCall").toggleClass('disabled');
        $("#makeNewCall").toggleClass('disabled');
    }
}
// Demo datagrid code
$(document).ready(function () {
    var comments = [
        {"Date": "17/08/2016 07:27:04", "User": "geniustest", "Comment": "Answer Machine"},
        {"Date": "18/08/2016 03:36:32", "User": "geniustest", "Comment": "Answer Machine"},
        {"Date": "19:08/2016 07:45:47", "User": "geniustest", "Comment": "Answer Machine"},
        {"Date": "22/08/2016 07:30:21", "User": "geniustest", "Comment": "Answer Machine"}
    ];

    $("#jsGrid").jsGrid({
        width: "70%",
        margin: "0 1\\\\5%",
        height: "20em",
        inserting: true,
        editing: true,
        sorting: true,
        paging: true,
        data: comments,
        confirmDeleting: true,
        deleteConfirm: " This willl remove the call record, which cannot be undone, are you sure you want to do this?",
        fields: [
            {name: "Date", type: "text", css: "dateCell", validate: "required", width: "20%"},
            {name: "User", type: "text", css: "userCell"},
            {name: "Comment", type: "text", css: "commentCell"},
            {type: "control", css: "controlCell"}
        ]
    })
});
 */
