function a(a) {
    return Math.max.apply(null, Object.keys(a).map(function(b) {
        return a[b]
    }))
}

function b(a, b) {
    return (b || ".") + a.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&").trim()
}

function c(a) {
    return (a.attr("class") || "").trim().split(/\s+/).filter(function(a) {
        return a
    })
}

function d(a) {
    function b(a, b) {
        for (var c = b.split(" "), d = 0; d < c.length; d++)
            if (!a.hasClass(c[d])) return !1;
        return !0
    }
    var d = $(a).children(),
        e = {},
        f = {};
    d.each(function() {
        if (!["script", "img"].includes(this.nodeName.toLowerCase()) && $(this).text().trim().length) {
            var a = c($(this)).sort().filter(function(a) {
                    return !a.match(/\d/)
                }),
                b = a.join(" ");
            b in f || (f[b] = 0), f[b]++, a.forEach(function(a) {
                a in e || (e[a] = 0), e[a]++
            })
        }
    });
    var g = Object.keys(f).filter(function(a) {
        return f[a] >= d.length / 2 - 2
    });
    return g.length || (g = Object.keys(e).filter(function(a) {
        return e[a] >= d.length / 2 - 2
    })), d.filter(function() {
        var a = !1,
            c = $(this);
        return g.forEach(function(d) {
            a |= b(c, d)
        }), a
    })
}

function e() {
    r.length || ($("body *").each(function() {
        var a = $(this).width() * $(this).height(),
            b = d(this),
            c = b.length,
            e = a * c * c;
        isNaN(e) || (r.push({
            table: this,
            area: a,
            children: b,
            text: b.text(),
            score: e,
            selector: m(this)
        }), bestArea = a, bestScore = e, bestChildren = b, bestTable = this)
    }), r = r.sort(function(a, b) {
        return a.score > b.score ? -1 : a.score < b.score ? 1 : 0
    }).slice(0, t), console.log("Best tables:", r))
}

function f() {
    var a = (s + r.length - 1) % r.length;
    $(r[a].table).removeClass("tablescraper-selected-table"), $(r[a].children).removeClass("tablescraper-selected-row"), $(r[s].table).addClass("tablescraper-selected-table"), $(r[s].children).addClass("tablescraper-selected-row")
}

function g() {
    $("*").removeClass("tablescraper-selected-table"), $("*").removeClass("tablescraper-selected-row")
}

function h(a) {
    return a.clone().children().remove().end().text()
}

function i(a) {
    var b = sha256.create();
    return b.update(a), b.hex()
}

function j(a) {
    if (null === localStorage.getItem("visited")) return !1;
    const b = i(a),
        c = JSON.parse(localStorage.getItem("visited"));
    return c[c.length - 1] === b || c[c.length - 2] === b
}

function k(a) {
    null === localStorage.getItem("visited") && localStorage.setItem("visited", JSON.stringify([]));
    const b = JSON.parse(localStorage.getItem("visited"));
    b.push(i(a)), localStorage.setItem("visited", JSON.stringify(b))
}

function l(a, b) {
    var e;
    if (b) {
        var g = function(a) {
            for (; a.length;) {
                if ($(a).length) return $(a);
                a = a.split(" ").slice(1).join(" ")
            }
            return null
        }(b);
        if (!g) return a({
            error: "Table not found"
        }), console.log("Table not found");
        r.length || (r = [{}]);
        var i = d(g);
        return j(i.text()) ? (a({
            error: "Table not changed. If the last page was not reached, try to increase crawl delay.",
            errorId: "finished"
        }), console.log("Table not changed")) : (r[s].table = g, r[s].children = i, r[s].text = i.text(), k(i.text()), f(), void l(a))
    }
    e = r[s].children;
    var m = [];
    e.each(function() {
        function a(a, b, c) {
            if (a) {
                for (var e = b + (c ? " " + c : ""), f = e, g = 1; f in d;) f = e + " " + ++g;
                d[f] = a
            }
        }

        function b(d, e) {
            d.children().each(function() {
                var d = $(this),
                    f = e + "/" + this.nodeName.toLowerCase() + c(d).map(function(a) {
                        return "." + a
                    }).join("");
                a(h(d).trim(), f), a(d.prop("href"), f, "href"), a(d.prop("src"), f, "src"), b(d, f)
            })
        }
        var d = {};
        $(this);
        b($(this), ""), Object.keys(d).length && m.push(d)
    }), console.log("Collected table data:", m), a({
        data: m,
        tableId: s,
        tableSelector: r[s].selector
    })
}

function m(a) {
    return $(a).parents().addBack().not("html").not("body").map(function() {
        var a = this.tagName.toLowerCase();
        return "string" == typeof this.id && this.id.trim() && !this.id.match(/\d+/g) ? a += b(this.id, "#") : "string" == typeof this.className && this.className.trim() && (a += b(this.className).replace(/ +/g, ".")), a
    }).get().join(" ")
}

function n(a) {
    window.focus(), w = function(a) {
        $(this).is($(a.target)) && ($("*").removeClass("tablescraper-hover"), $(m(this)).last().addClass("tablescraper-hover"))
    };
    var b = function(b) {
        $("*").off("click", v).off("mouseenter", w), $(".tablescraper-hover").removeClass("tablescraper-hover"), $(".tablescraper-next-button").removeClass("tablescraper-next-button");
        var c = m(b.target);
        $(b.target).addClass("tablescraper-next-button"), console.log("Next button selector:", c), a({
            selector: c
        })
    };
    v = function(a) {
        return a.preventDefault(), b(a), !1
    }, $("*").click(v).on("mouseenter", w)
}

function o(a) {
    var b = document.createEvent("MouseEvents");
    b.initMouseEvent("mousedown", !0, !0, window, 1, a.x, a.y, a.x, a.y, !1, !1, !1, !1, 0, null);
    var c = document.createEvent("MouseEvents");
    c.initMouseEvent("click", !0, !0, window, 1, a.x, a.y, a.x, a.y, !1, !1, !1, !1, 0, null);
    var d = document.createEvent("MouseEvents");
    d.initMouseEvent("mouseup", !0, !0, window, 1, a.x, a.y, a.x, a.y, !1, !1, !1, !1, 0, null), a.dispatchEvent(b), a.dispatchEvent(c), a.dispatchEvent(d)
}

function p(a, b) {
    return $("html, body").animate({
        scrollTop: $(document).height()
    }, 1e3), b(a === $(document).height() ? {
        error: "Finished crawling. Download CSV or Excel file",
        errorId: "finished"
    } : {})
}

function q(a, b, c) {
    var d = function(a) {
        for (; a.length;) {
            if ($(a).length) return $(a);
            a = a.split(" ").slice(1).join(" ")
        }
        return null
    }(a);
    return d ? (d.last().addClass("tablescraper-next-button"), c ? b({}) : ($("*").off("click", v).off("mouseenter", w), void setTimeout(function() {
        o(d.last()[0]), b({})
    }, 100))) : b(c ? {
        error: "Next button not found",
        errorId: "error"
    } : {
        error: "No more next buttons: Finished crawling. Download CSV or Excel file",
        errorId: "finished"
    })
}
var r = [],
    s = 0,
    t = 5,
    u = new Set,
    v, w, x = !1;
chrome.extension.onRequest.addListener(function(a, b, c) {
    return console.log("Got request", a), "nextTable" == a.action || "findTables" == a.action ? ("findTables" == a.action ? e() : s = (s + 1) % r.length, f(), localStorage.removeItem("visited"), c({
        tableId: s,
        tableSelector: r[s].selector,
        href: window.location.href,
        hostname: window.location.hostname
    })) : "getTableData" == a.action ? l(c, a.selector) : "getNextButton" == a.action ? n(c) : "clickNext" == a.action ? q(a.selector, c) : "scrollDown" === a.action ? (g(), p(0, c)) : "markNextButton" == a.action ? q(a.selector, c, !0) : void c({})
});