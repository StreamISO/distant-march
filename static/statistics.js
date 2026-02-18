function print_statistics() {
    if (current_page != 'menu8') return;
    if (statistics[6] == 0) {
        for (var i = 3; i <= 7; i++) {
            document.getElementById('st' + String(i)).style.display = 'none';
        }
    }
    if (statistics[8] == 0) {
        for (var i = 8; i <= 9; i++) {
            document.getElementById('st' + String(i)).style.display = 'none';
        }
    }
    if (star_point <= 0 && dilated_time.low_get() < 0.001) document.getElementById('st10').style.display = 'none';
    if (dilated_time.low_get() < 0.001) document.getElementById('st11').style.display = 'none';
    for (var i = 1; i <= statistics_category_cnt; i++) {
        if (i == 3 || i == 7 || i == 9 || i == 10 || i == 11) {
            let res = calc_time_played(statistics[i]);
            var hh = res[0], mm = res[1], ss = res[2], ms = res[3];
            document.getElementById('st' + String(i) + '_val').innerHTML = String(parseInt(hh)) + '小时 ' + String(parseInt(mm)) + '分 ' + String(parseInt(ss)) + '秒 ' + String(parseInt(ms)) + '毫秒';
        } else
            document.getElementById('st' + String(i) + '_val').innerHTML = sci_num(statistics[i], i == 6 || i == 8);
    }
}