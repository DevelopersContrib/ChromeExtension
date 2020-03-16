var objData;
$(document).on('click','.trkr-btn-proceed',function(){
	var data = [];
	var x = 0;
	jQuery('#trkr-frmprocess').html('');
	for(var y=0;y<objData.length;y++){
		var col = {name:'',email:'',address:'',phone:'',company:'',notes:'',social:'',domains:''};
		col['name'] = objData[y][0];
		
		data.push(col);
		jQuery('#trkr-frmprocess').append('<input name="people['+x+'][name]" type="hidden" value="'+col.name.replace("'",'').replace('"','')+'" />');
		// jQuery('#trkr-frmprocess').append('<input name="people['+x+'][email]" type="hidden" value="'+col.email.replace("'",'').replace('"','')+'" />');
		// jQuery('#trkr-frmprocess').append('<input name="people['+x+'][address]" type="hidden" value="'+col.address.replace("'",'').replace('"','')+'" />');
		// jQuery('#trkr-frmprocess').append('<input name="people['+x+'][phone]" type="hidden" value="'+col.phone.replace("'",'').replace('"','')+'" />');
		// jQuery('#trkr-frmprocess').append('<input name="people['+x+'][company]" type="hidden" value="'+col.company.replace("'",'').replace('"','')+'" />');
		// jQuery('#trkr-frmprocess').append('<input name="people['+x+'][notes]" type="hidden" value="'+col.notes.replace("'",'').replace('"','')+'" />');
		// jQuery('#trkr-frmprocess').append('<input name="people['+x+'][social]" type="hidden" value="'+col.social.replace("'",'').replace('"','')+'" />');
		// jQuery('#trkr-frmprocess').append('<input name="people['+x+'][domains]" type="hidden" value="'+col.domains.replace("'",'').replace('"','')+'" />');
		// jQuery('#trkr-frmprocess').append('<input name="people['+x+'][twitter]" type="hidden" value="" />');
		x++;
	}
	
	if(jQuery('#trkr-frmprocess').html()==''){
		alert('Please select column for research');
		return false;
	}else{
		jQuery('#trkr-frmprocess').attr('action',jQuery('.proceed:checked').val());
		jQuery('#trkr-frmprocess').submit();
	}
});
$(function() {
	var url_ = e("url");
	if(url_.indexOf('twitter.com')>-1){
		jQuery('#savetwitter').attr('href','https://manage.vnoc.com/research/integration?twitter='+encodeURIComponent(e("url")));
		jQuery('#savetwitter').show();
	}else{
		jQuery('#savetwitter').hide();
	}
});
function a(a, b, c, d, e, f, g) {
    function h() {
        !n && o && (g || function(a) {
            a(!0)
        })(function(a) {
            if (!a) return k();
            n || (n = !0, chrome.webRequest.onBeforeRequest.removeListener(i), chrome.webRequest.onCompleted.removeListener(j), b())
        })
    }

    function i(a) {
        l[a.requestId] = 1, m = new Date
    }

    function j(a) {
        m && (delete l[a.requestId], Object.keys(l).length || k())
    }

    function k() {
        setTimeout(function() {
            new Date - m < e || Object.keys(l).length || h()
        }, e)
    }
    var l = {},
        m = null,
        n = !1,
        o = !1,
        p = {
            urls: ["<all_urls>"],
            tabId: c,
            types: ["main_frame", "sub_frame", "stylesheet", "script", "font", "object", "xmlhttprequest", "other"]
        };
    chrome.webRequest.onBeforeRequest.addListener(i, p), chrome.webRequest.onCompleted.addListener(j, p), chrome.webRequest.onErrorOccurred.addListener(j, p), (a || function(a) {
        a()
    })(function() {
        setTimeout(h, d), setTimeout(function() {
            o = !0, k()
        }, f)
    })
}

function b() {
    -1 !== A.url.toLowerCase().indexOf(".linkedin.") ? ($("#waitHeader").hide(), f("We're unable to collect data from LinkedIn. Sorry for the inconvenience.  If you have further questons please contact us at info@webrobots.io", "noResponseErr", !1, !0)) : (v(), s(), setTimeout(function() {
        $("#waitHeader").is(":visible") && q(!0)
    }, 3e4), $(window).resize(function() {
        o()
    }))
}

function c(a, b) {
    return (b || ".") + a.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&")
}

function d(a) {
    return (a.attr("class") || "").trim().split(/\s+/).filter(function(a) {
        return a
    })
}

function e(a) {
    for (var b = window.location.search.substring(1), c = b.split("&"), d = 0; d < c.length; d++) {
        var e = c[d].split("=");
        if (decodeURIComponent(e[0]) == a) return decodeURIComponent(e[1])
    }
    console.log("Query variable %s not found", a)
}

function f(a, b, c, d) {
    if ("" === a) return $("#" + b).hide();
    $("#" + b).show().text(a), c && w(), d
}

function g(a) {
    function b(a) {
        return a in e ? e[a] : (e[a] = $(c(a)).length, e[a])
    }
    var d = a.length,
        e = {
            "": 1 / 0
        },
        f = {},
        g = {},
        h = {},
        i = {};
    a.map(function(a) {
        for (var b in a) b in f || (f[b] = 0), f[b]++
    }), Object.keys(f).map(function(a) {
        return [f[a], a]
    }).forEach(function(c) {
        var e = "",
            f = 1 / 0;
        c[1].split(" ")[0].split("/").slice(1).reverse().forEach(function(a) {
            a.split(".").slice(1).forEach(function(a) {
                f < 2 * d || b(a) >= f || (e = a, f = b(a))
            })
        });
        var j = c[1].split(" ")[1],
            k = 0,
            l = a.map(function(a) {
                return c[1] in a
            });
        j && isNaN(j) && (e += " " + j), e in g ? (g[e].forEach(function(a, b) {
            if (!k) {
                var c = !0;
                a.forEach(function(a, b) {
                    c &= !(l[b] && a)
                }), c && (k = b + 1)
            }
        }), k ? g[e][k - 1] = g[e][k - 1].map(function(a, b) {
            return l[b] || a
        }) : (g[e].push(l), k = g[e].length), k > 1 && (e += " " + k)) : g[e] = [l], e in h || (h[e] = []), h[e].push(c[1]), e in i || (i[e] = 0), i[e] += c[0]
    });
    var j = {},
        k = 0,
        l = 0,
        m = 0;
    g = Object.keys(h).filter(function(b) {
        var c = {},
            e = [];
        return !(b in B.config.deletedFields) && (a.map(function(a) {
            for (var d, f = 0; f < h[b].length; f++) h[b][f] in a && (d = a[h[b][f]], d in c || (c[d] = 0), c[d]++);
            e.push(d)
        }), Object.keys(c).length && c[Object.keys(c)[0]] == d ? (l++, !1) : (e = JSON.stringify(e)) in j ? (k++, !1) : (j[e] = 1, !(i[b] < .2 * d) || (m++, !1)))
    }), console.log("Same columns: " + k), console.log("Columns with same rows: " + l), console.log("Columns with few rows: " + m), console.log("Generated column names:", g);
    var n = {
        fields: g,
        data: a.map(function(a) {
            return g.map(function(b) {
                for (var c = 0; c < h[b].length; c++)
                    if (h[b][c] in a) return a[h[b][c]];
                return ""
            })
        })
    };
	objData = n.data;
    return console.log("Generated csv:", n), n
}

function h(a) {
    return a.map(function(a) {
        return a in B.config.headers ? B.config.headers[a] : a
    })
}

function i(a) {
    var b = g(a);
    return b.fields = h(b.fields), b
}

function j(a) {
    for (var b = new ArrayBuffer(a.length), c = new Uint8Array(b), d = 0; d != a.length; ++d) c[d] = 255 & a.charCodeAt(d);
    return b
}

function k(a, b) {
    return b && (a += 1462), (Date.parse(a) - new Date(Date.UTC(1899, 11, 30))) / 864e5
}

function l(a, b) {
    for (var c = {}, d = {
            s: {
                c: 1e7,
                r: 1e7
            },
            e: {
                c: 0,
                r: 0
            }
        }, e = 0; e != a.length; ++e)
        for (var f = 0; f != a[e].length; ++f) {
            d.s.r > e && (d.s.r = e), d.s.c > f && (d.s.c = f), d.e.r < e && (d.e.r = e), d.e.c < f && (d.e.c = f);
            var g = {
                v: a[e][f]
            };
            if (null !== g.v) {
                var h = XLSX.utils.encode_cell({
                    c: f,
                    r: e
                });
                "number" == typeof g.v ? g.t = "n" : "boolean" == typeof g.v ? g.t = "b" : g.v instanceof Date ? (g.t = "n", g.z = XLSX.SSF._table[14], g.v = k(g.v)) : g.t = "s", c[h] = g
            }
        }
    return d.s.c < 1e7 && (c["!ref"] = XLSX.utils.encode_range(d)), c
}

function m(a, b) {
    function c() {
        if (!(this instanceof c)) return new c;
        this.SheetNames = [], this.Sheets = {}
    }
    a.data.unshift(a.fields);
    var d = new c,
        e = l(a.data);
    return d.SheetNames.push(b), d.Sheets[b] = e, XLSX.write(d, {
        type: "binary"
    })
}

function n() {
    
}

function o() {
    console.log("Showing preview");
    var a = g(B.data);
    a.data = a.data.slice(0, C), B.previewLength = a.data.length;
    var b = $(".wtHolder").scrollTop(),
        c = $(".wtHolder").scrollLeft(),
        d = !1;
    $("#hot").empty();
    new Handsontable($("#hot").get(0), {
        data: a.data,
        colHeaders: h(a.fields),
        wordWrap: !1,
        manualColumnResize: !0,
        width: $(window).width() - 20,
        height: $(window).height() - 300,
        afterRender: function() {
            d || (d = !0, $(".wtHolder").scrollTop(b), $(".wtHolder").scrollLeft(c))
        },
        modifyColWidth: function(a, b) {
            if (a > 300) return 300
        },
        afterGetColHeader: function(b, c) {
            if (-1 != b && !($(c).children().length > 1)) {
                var d = this,
                    e = $("<div>", {
                        class: "hot-header"
                    }),
                    f = $("<div>", {
                        class: "header-input",
                        contenteditable: "true",
                        text: c.firstChild.textContent
                    });
                $(c).append(e), e.append(f), e.append($("<span>", {
                    class: "glyphicon glyphicon-remove remove-column"
                }).click(function() {
                    B.config.deletedFields[a.fields[b]] = !0, p(), $("#resetColumns").show(), o()
                })), $(c).click(function() {
                    console.log("a"), setTimeout(function() {
                        f.trigger("focus")
                    }, 10)
                }), Handsontable.Dom.addEvent(f.get(0), "input", function(c) {
                    var e = d.getColHeader();
                    e[b] = f.text(), console.log(f.text()), B.config.headers[a.fields[b]] = f.text(), p(), d.updateSettings({
                        colHeaders: e
                    })
                }), c.firstChild.style.display = "none"
            }
        },
        beforeOnCellMouseDown: function(a, b, c) {
            b.row < 0 && a.stopImmediatePropagation()
        }
    })
}

function p() {
    localStorage.setItem(B.configName, JSON.stringify(B.config))
}

function q(a) {
    $("#waitHeader").hide(), f("Instant Data doesn't support data extraction from this site yet. Our administrators are notified and will try to add support in the future. Thanks for trying us out!", "noResponseErr", !1, !0)
}

function r(a, b) {
    if (!a) return A.reloaded ? q() : (A.reloaded = !0, chrome.tabs.reload(A.id, {}, function() {
        setTimeout(s, 1e3)
    }));
    B.tableId = a.tableId, B.scraping = !1, B.tableSelector = a.tableSelector, B.startingUrl = a.href, B.hostName = a.hostname, B.previewLength = 0, B.configName = a.hostname + "-config", B.config = JSON.parse(localStorage.getItem(B.configName)) || {
        headers: {},
        deletedFields: {},
        crawlDelay: 1e3,
        maxWait: 2e4
    }, /*_gaq.push(["_trackEvent", b ? "OpenPopup" : "AnotherTable", B.hostName, B.startingUrl, 1]),*/ Object.keys(B.config.deletedFields).length && $("#resetColumns").show();
    var c = A.url.substring(0, 30);
    $("#wrongTable").show(), B.config.infinateScrollChecked && $("#infinateScroll").click(), chrome.tabs.sendRequest(A.id, {
        action: "getTableData"
    }, function(a) {
        a.tableId == B.tableId && (B.pages || ($("#nextButton").show(), B.nextSelector = localStorage.getItem("nextSelector:" + B.hostName), console.log("Next selector for " + B.hostName, B.nextSelector), B.nextSelector && chrome.tabs.sendRequest(A.id, {
            action: "markNextButton",
            selector: B.nextSelector
        }, function(a) {
            a.error || $("#startScraping").show()
        })), $("#wait").hide(), $("#content").show(), f('Download data or locate "Next" to crawl multiple pages', "instructions"), B.data = a.data, B.pages = 1, B.lastRows = a.data.length, B.tableSelector = a.tableSelector, B.workingTime = 0, z(), o(), $(".download-button").show(), $("#csv").off("click").click(function() {
            console.log("Downloading CSV..."), n(), y({
                download: !0
            }), saveAs(new Blob([Papa.unparse(i(B.data))], {
                type: "application/octet-stream"
            }), c + ".csv")
        }), $("#xlsx").off("click").click(function() {
            console.log("Downloading XLS..."), n(), y({
                download: !0
            }), saveAs(new Blob([j(m(i(B.data), A.url.substring(0, 100)))], {
                type: "application/octet-stream"
            }), c + ".xlsx")
        }))
    })
}

function s() {
    chrome.tabs.sendRequest(A.id, {
        action: "findTables"
    }, function(a) {
        r(a, !0)
    })
}

function t() {
    return $("#infinateScroll").is(":checked")
}

function u(a) {
    t() ? B.data = a : B.data = B.data.concat(a)
}

function v() {
    $("#stopScraping").click(w), $("#crawlDelay").bind("propertychange change click keyup input paste", function() {
        var a = $(this).val();
        if (isNaN(a) || a < 0 || parseInt(1e3 * a) >= B.config.maxWait) return f("Bad min waiting value", "inputError");
        f("", "inputError"), B.config.crawlDelay = parseInt(1e3 * a), p()
    }), $("#maxWait").bind("propertychange change click keyup input paste", function() {
        var a = $(this).val();
        if (isNaN(a) || parseInt(1e3 * a) <= B.config.crawlDelay) return f("Bad max waiting value", "inputError");
        f("", "inputError"), B.config.maxWait = parseInt(1e3 * a), p()
    }), $("#resetColumns").click(function() {
        B.config.deletedFields = {}, p(), $("#resetColumns").hide(), o()
    }), $("#infinateScroll").click(function(a) {
        $(this).is(":checked") ? (B.config.infinateScrollChecked = !0, $("#nextButton").hide(), $("#startScraping").show()) : (B.config.infinateScrollChecked = !1, $("#nextButton").show(), $("#startScraping").hide()), p()
    })
}

function w() {
    B.scraping = !1, console.log("Scraping stopped."), $("#startScraping").show(), $("#stopScraping").hide(), f("Crawling stopped. Click Proceed to Research.", "instructions")
}

function x() {
   
}

function y(a) {
    var b = JSON.parse(localStorage.getItem("stats")) || {
        pages: 0,
        rows: 0,
        downloads: 0,
        tabs: 0,
        lastRateRequest: null,
        lastDownloads: 0,
        lastRows: 0,
        rated: !1
    };
    a.download ? b.downloads++ : a.rate ? ("later" == a.rate && (b.lastRateRequest = (new Date).getTime(), b.lastDownloads = b.downloads, b.lastRows = b.rows), "now" == a.rate && (b.rated = !0)) : (1 == B.pages && b.tabs++, b.pages++, b.rows += B.lastRows), !b.rated && (new Date).getTime() - b.lastRateRequest > 52704e5 && b.downloads - b.lastDownloads > 9 && b.rows - b.lastRows > 999 && x(), localStorage.setItem("stats", JSON.stringify(b))
}

function z() {
    $("#stats").empty().append($("<div>", {
        text: "Pages scraped: " + B.pages
    })).append($("<div>", {
        text: "Rows collected: " + B.data.length
    })).append($("<div>", {
        text: "Rows from last page: " + B.lastRows
    })).append($("<div>", {
        text: "Working time: " + parseInt(B.workingTime / 1e3) + "s"
    }))
}
var A = {
        id: parseInt(e("tabid")),
        url: e("url")
    },
    B = {},
    C = 1e3;
b(), $("#wrongTable").click(function() {
    chrome.tabs.sendRequest(A.id, {
        action: "nextTable"
    }, r)
}), $("#nextButton").click(function() {
    function a() {
        chrome.tabs.sendRequest(A.id, {
            action: "getNextButton"
        }, function(b) {
            B.scraping || (B.gettingNext && a(), b.selector && ($("#startScraping").show(), f('"Next" button located. Press "Start crawling" to get more pages or mark another button/link if marked incorrectly.', "instructions"), B.nextSelector = b.selector, localStorage.setItem("nextSelector:" + B.hostName, b.selector), console.log(b)))
        })
    }
    $("#nextButton").hide(), $("#infinateScrollElement").hide(), f('Mark "Next" button or link', "instructions"), B.gettingNext = !0, a()
}), $("#startScraping").click(function() {
    function b() {
        const d = function(a) {
                chrome.tabs.sendRequest(A.id, {
                    action: "clickNext",
                    selector: B.nextSelector
                }, function(b) {
                    if (b && b.error) return f("", "instructions"), f(b.error, b.errorId, !0);
                    $("#wrongTable").hide(), a()
                })
            },
            e = function(a) {
                chrome.tabs.sendRequest(A.id, {
                    action: "scrollDown"
                }, function(b) {
                    if (b && b.error) return f("", "instructions"), f(b.error, b.errorId || "error", !0);
                    $("#wrongTable").hide(), a()
                })
            };
        var g = d;
        t() && (g = e), a(g, function() {
            chrome.tabs.sendRequest(A.id, {
                action: "getTableData",
                selector: B.tableSelector
            }, function(a) {
                if (a) {
                    if (a.error) return f("", "instructions"), f(a.error, a.errorId || "error", !0);
                    B.lastRows = a.data.length, B.pages++, B.workingTime += new Date - c, c = new Date, u(a.data), z(), B.previewLength < C ? o() : f("Preview limited to 1000 rows.", "previewLimit"), B.scraping && b()
                }
            })
        }, A.id, B.config.maxWait, 100, B.config.crawlDelay, function(a) {
            chrome.tabs.sendRequest(A.id, {}, function(b) {
                a(void 0 !== b)
            })
        })
    }
    B.gettingNext = !1, 
	B.scraping = !0, 
	console.log("Starting scraping..."), 
	$("#startScraping").hide(), 
	$("#nextButton").hide(), 
	$("#stopScraping").show(), 
	f("", "error"), 
	f('Please wait for more pages or press "Stop crawling".', "instructions"), 
	t() && $("#infinateScrollElement").hide();
    var c = new Date;
    b()
});
