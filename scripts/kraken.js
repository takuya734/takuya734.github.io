window.onload = function () {
    const clock_h = document.getElementById("hh"); // 時
    const clock_m = document.getElementById("mm"); // 分
    const clock_s = document.getElementById("ss"); // 秒
    const clock_colon = document.getElementById("colon"); // コロン
    const cputemp = document.getElementById("cputemp"); // CPU温度
    const watertemp = document.getElementById("watertemp"); // 水温
    const is_kraken = window.location.search.includes("kraken=1");

    let cputemp_value = 0;
    let watertemp_value = 0;

    let display_colon_flg = true; // コロンの表示フラグ

    const update_clock = function () {
        const date = new Date();
        const hour = ("00" + date.getHours()).slice(-2);
        const min = ("00" + date.getMinutes()).slice(-2);
        const sec = ("00" + date.getSeconds()).slice(-2);
        const msec = date.getMilliseconds();

        // コロンの表示フラグを反転
        display_colon_flg = !display_colon_flg;

        // 時分秒を表示
        clock_h.innerText = hour;
        clock_m.innerText = min;
        clock_s.innerText = sec;

        // コロンの表示フラグがtrueならコロンを表示、そうでなければコロンは非表示（空文字）
        if (display_colon_flg) {
            clock_colon.innerText = ":";
        } else {
            clock_colon.innerText = "";
        }

        // 次の更新タイミングを調整
        setTimeout(update_clock, 1000 - msec);
    };

    const update_hwmonitor = function () {
        const date = new Date();
        const msec = date.getMilliseconds();

        cputemp.innerText = String(20 + Math.floor(Math.random() * 80));
        watertemp.innerText = String(20 + Math.floor(Math.random() * 50));

        setTimeout(update_hwmonitor, 1000 - msec);
    };

    if (is_kraken) {
        window.nzxt = window.nzxt || {};
        window.nzxt.v1 = window.nzxt.v1 || {};
        window.nzxt.v1.onMonitoringDataUpdate = function (data) {
            cputemp.innerText = data?.cpus?.[0]?.temperature?.toFixed(0) ?? "00";
            watertemp.innerText = data?.kraken?.liquidTemperature?.toFixed(0) ?? "00";
        };
    } else {
        update_hwmonitor();
    }

    update_clock();
};