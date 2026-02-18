function mach_reset(rainbow = 0) {
    if (velocity.low_get() < 339.99) return;
    unlock_achievements(1);
    if (statistics[3] < statistics[7]) statistics[7] = parseInt(statistics[3]);
    if (mach_broken) mach_point = high_add(mach_point, break_mach_upgrade_formula(0, 0, rainbow));
    else mach_point = high_add(mach_point, mach_upgrade_formula(0, 0, rainbow));
    statistics[6] += 1;
    if (!rainbow)
        soft_reset();
}
function print_mach() {
    if (current_page != 'menu3') return;
    document.getElementById('mhp_cnt').innerHTML = f_sci_num(mach_point, 1);
    document.getElementById('b_machup11_val').innerHTML = sci_num(mach_upgrade_formula(1, 1));
    document.getElementById('b_machup21_val').innerHTML = sci_num(mach_upgrade_formula(2, 1));
    document.getElementById('b_machup31_val').innerHTML = sci_num(mach_upgrade_formula(3, 1));
    document.getElementById('b_machup71_val').innerHTML = sci_num(mach_upgrade_formula(7, 1));
    for (let j = 1; j <= mach_col; j++) {
        document.getElementById('b_machup4' + String(j) + '_val').innerHTML = sci_num(mach_upgrade_formula(4, j));
    }
    for (let i = 1; i <= mach_row; i++) {
        for (let j = 1; j <= mach_col; j++) {
            let str = '';
            if (i == 4) {
                str = '已投入 ' + sci_num(mach_upgrade_unlocked[i][j], 1) + ' 马赫点数';
                if (mach_upgrade_unlocked[i][j] > 0) {
                    document.getElementById('b_machup' + String(i) + String(j)).style.backgroundColor = '#00aa00';
                    document.getElementById('b_machup' + String(i) + String(j)).style.color = '#000000';
                } else {
                    document.getElementById('b_machup' + String(i) + String(j)).style.backgroundColor = '';
                    document.getElementById('b_machup' + String(i) + String(j)).style.color = '';
                }
                document.getElementById('b_machup' + String(i) + String(j) + '_inv').innerHTML = str;
            } else {
                if (mach_upgrade_unlocked[i][j] == 0) {
                    str = sci_num(mach_upgrade_cost[i][j], 1) + '马赫点数';
                    document.getElementById('b_machup' + String(i) + String(j)).style.backgroundColor = '';
                    document.getElementById('b_machup' + String(i) + String(j)).style.color = '';
                }
                else {
                    document.getElementById('b_machup' + String(i) + String(j)).style.backgroundColor = '#00aa00';
                    document.getElementById('b_machup' + String(i) + String(j)).style.color = '#000000';
                }
                document.getElementById('b_machup' + String(i) + String(j) + '_cost').innerHTML = str;
            }
        }
    }
}
function mach_upgradable(x, y) {
    if (x == 4 && mach_upgrade_disabled[y]) return false;
    if (x > 1 && mach_upgrade_unlocked[x - 1][y] == 0) return false;
    if (mach_upgrade_unlocked[x][y] && x != 4) return false;
    if (x == 4) return mach_point.low_get() > 0;
    if (mach_point.low_get() < mach_upgrade_cost[x][y]) return false;
    return true;
}
function mach_upgrade(x, y) {
    let inv_point = 0;
    if (mach_upgradable(x, y)) {
        if (x == 4) {
            inv_point = Math.floor(low_mul(mach_point, (mach_inv_ratio / 100.0)).low_get());
            mach_point = low_sub(mach_point, inv_point);
            mach_upgrade_unlocked[x][y] += inv_point;
        } else {
            mach_point = low_sub(mach_point, mach_upgrade_cost[x][y]);
            mach_upgrade_unlocked[x][y] = 1;
        }
    }
}
function mach_upgrade_formula(x, y) {//0,0 代表音爆计算公式
    if (x == 0 && y == 0) {
        let bmp = new Float(1, 0);//debug
        if (achievements_unlocked[14] >= 1) bmp = low_mul(bmp, 100);
        if (velocity.low_get() < 339.99) return new Float(0, 0);
        if (mach_upgrade_unlocked[4][2]) bmp = low_mul(bmp, mach_upgrade_formula(4, 2));
        if (stars_upgrade_unlocked[10]) bmp = low_mul(bmp, stars_formula(10));
        if (stars_upgrade_unlocked[11]) bmp = low_mul(bmp, stars_formula(11));
        if (stars_upgrade_unlocked[31]) bmp = low_mul(bmp, stars_formula(31));
        if (stars_upgrade_unlocked[32]) bmp = low_mul(bmp, stars_formula(32));
        if (stars_upgrade_unlocked[33]) bmp = low_mul(bmp, stars_formula(33));
        if (current_challenge == 9) return new Float(1, 0);
        if (dream_mode) bmp = low_pow(bmp, dream_val);
        return bmp;
    } else if (x == 1 && y == 1) {
        return Math.log10(statistics[2]) * 0.11 + 1;
    } else if (x == 1 && y == 2) {
        return 5;
    } else if (x == 1 && y == 3) {
        return 0.03;
    } else if (x == 2 && y == 1) {
        if (statistics[5] <= 1) return 1;
        return Math.log(statistics[5]) * 0.125 + 1;
    } else if (x == 2 && y == 2) {
        return 0.5;
    } else if (x == 2 && y == 3) {
        return 0.03;
    } else if (x == 3 && y == 1) {
        if (break_mach_upgrade_unlocked[4][1]) return Math.pow(1.1, achievements_level);
        return 0.1 * achievements_level + 1;
    } else if (x == 3 && y == 2) {
        return 1;
    } else if (x == 3 && y == 3) {
        return 0.03;
    } else if (x == 4 && y == 1) {
        if (mach_upgrade_unlocked[x][y] >= 1e100) mach_upgrade_disabled[1] = 1, mach_upgrade_unlocked[x][y] = 1e100;
        if (mach_upgrade_unlocked[x][y] == 0) return 1;
        else return Math.max(0.05 * Math.log2(mach_upgrade_unlocked[x][y]), 0) + 1;
    } else if (x == 4 && y == 2) {
        if (mach_upgrade_unlocked[x][y] >= 1e100) mach_upgrade_disabled[2] = 1, mach_upgrade_unlocked[x][y] = 1e100;
        if (mach_upgrade_unlocked[x][y] <= 10) return 1;
        else return Math.max(Math.pow(2, Math.floor(Math.log10(mach_upgrade_unlocked[x][y]))), 0);
    } else if (x == 4 && y == 3) {
        if (mach_upgrade_43_tmp > 0.109999) mach_upgrade_disabled[3] = 1;
        return mach_upgrade_43_tmp;
    } else if (x == 4 && y == 4) {
        if (mach_upgrade_unlocked[x][y] == 0) return 1.00;
        else {
            let aft = 1 / (1 + Math.sqrt(mach_upgrade_unlocked[x][y]));
            if (aft < 0.01) aft = 0.01, mach_upgrade_disabled[4] = 1;
            return aft;
        }
    } else if (x == 5 && y == 2) {
        return 1;
    } else if (x == 5 && y == 3) {
        return 1;
    } else if (x == 6 && y == 1) {
        return 1.5;
    } else if (x == 6 && y == 3) {
        return 1;
    } else if (x == 7 && y == 1) {
        return Math.sqrt(Math.log10(1.0e9 / statistics[7]));
    } else if (x == 7 && y == 3) {
        return 10;
    }
}