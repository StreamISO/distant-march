function unlock_achievements(reach_mach = 0, reach_challenge = 0, complete_achievement = 0) {
    if (mach_upgrade_unlocked[5][1]) document.getElementById('ac_lvl').style.display = '';
    else document.getElementById('ac_lvl').style.display = 'none';
    achievements_level = 0;
    for (let i = 1; i <= achievements_category_cnt; i++) {
        let flag = 0;
        switch (i) {
            case 1: {
                flag = substance_cnt[1] > 0;
                break;
            }
            case 2: {
                flag = velocity.low_get() > 100.0;
                break;
            }
            case 3: {
                flag = substance_cnt[3] > 0 || cur_stellar_turbo > 0;
                break;
            }
            case 4: {
                flag = reach_mach;
                break;
            }
            case 5: {
                flag = reach_mach && statistics[3] <= 360000;
                break;
            }
            case 6: {
                flag = reach_mach && statistics[3] <= 6000;
                break;
            }
            case 7: {
                flag = distance.low_get() >= 1.08e9;
                break;
            }
            case 8: {
                flag = velocity.low_get() >= 1.00e3;
                break;
            }
            case 9:
            case 10:
            case 11:
            case 12:
            case 13: {
                flag = (reach_challenge + 8) == i;
                break;
            }
            case 14: {
                flag = velocity.low_get() >= 7.92e3;
                break;
            }
            case 15: {
                flag = velocity.low_get() >= 7.92e3 && statistics[3] <= 52;
                break;
            }
            case 16: {
                flag = velocity.low_get() >= 340.00 && break_mach_upgrade_formula(0, 0).low_get() >= 1e30;
                break;
            }
            case 17: {
                flag = velocity.low_get() >= 1.00e5;
                break;
            }
            case 18: {
                flag = star_point >= 5;
                break;
            }
            case 19: {
                flag = star_point >= 10;
                break;
            }
            case 20:
            case 21:
            case 22:
            case 23:
            case 24: {
                flag = (reach_challenge + 14) == i;
                break;
            }
            case 25: {
                flag = broken_heart.low_get() >= 1e15;
                break;
            }
            case 26: {
                flag = substance_cnt[4] >= 50;
                break;
            }
            case 27: {
                flag = velocity.low_get() >= 3.00e6;
                break;
            }
            case 28: {
                flag = velocity.low_get() >= 340.00 && break_mach_upgrade_formula(0, 0).low_get() >= 9.99e307;
                break;
            }
            case 29: {
                flag = complete_achievement == 29;
                break;
            }
        }
        if (flag && achievements_unlocked[i] == 0)
            achievements_cnt += 1, achievements_unlocked[i] = 1, unlock_signal = 1;
        if (flag && (1 + restriction_activated_cnt > achievements_unlocked[i]))
            achievements_unlocked[i] = 1 + restriction_activated_cnt, unlock_signal = 2;
        achievements_level += achievements_unlocked[i];
    }
    if (blackhole_mode) {
        for (let i = 1; i <= destinies_category_cnt; i++) {
            let flag = 0;
            switch (i) {
                case 1: {
                    flag = velocity.low_get() > 339.99;
                    break;
                }
                case 2: {
                    flag = stellar_charge.b >= 1080;
                    break;
                }
                case 3: {
                    flag = complete_achievement == 1003;
                    break;
                }
                case 4: {
                    flag = booster_energy > 0.001 && statistics[10] >= 100 * 3600 * 13.7;
                    break;
                }
                case 5: {
                    flag = max_resistance >= 1.68e7 && time_resistance < 0.001;
                    break;
                }
                case 6: {
                    flag = complete_achievement == 1006;
                    break;
                }
            }
            if (flag && destinies_unlocked[i] == 0)
                destinies_cnt += 1, destinies_unlocked[i] = 1, unlock_signal = 3;
        }
    }
    if (mach_upgrade_unlocked[6][1]) achievements_level = Math.floor(achievements_level * mach_upgrade_formula(6, 1));
    if (unlock_signal == 1) {
        document.getElementById('title').innerHTML = '新的成就已解锁!';
    } else if (unlock_signal == 2) {
        document.getElementById('title').innerHTML = '成就已升级!';
    } else if (unlock_signal == 3) {
        document.getElementById('title').innerHTML = '新的命运已解锁!';
    }
}
function print_achievements() {
    unlock_achievements();
    if (current_page != 'menu9') return;
    document.getElementById('ac_cnt').innerHTML = achievements_cnt;
    document.getElementById('ac_lvl_val').innerHTML = achievements_level;
    document.getElementById('de_cnt').innerHTML = destinies_cnt;
    for (let i = 1; i <= achievements_category_cnt; i++) {
        let str = 'ac' + String(i);
        document.getElementById(str).innerHTML = achievements_name[i];
        if (achievements_unlocked[i]) document.getElementById(str).innerHTML += ' (已获得)';
        if (achievements_unlocked[i] && mach_upgrade_unlocked[5][1]) document.getElementById(str).innerHTML += ' (' + String(achievements_unlocked[i]) + ')';
    }
    for (let i = 1; i <= destinies_category_cnt; i++) {
        let str = 'de' + String(i);
        document.getElementById(str).innerHTML = destinies_name[i];
        if (destinies_unlocked[i]) document.getElementById(str).innerHTML += ' (已获得)';
    }
}