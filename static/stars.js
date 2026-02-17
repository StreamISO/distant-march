function basic_reset(ch = 0) {
    if (!relative_upgrade_unlocked[1][4]) {
        document.getElementById('menu2').style.display = 'none';
        document.getElementById('menu3').style.display = 'none';
        document.getElementById('menu4').style.display = 'none';
        document.getElementById('menu7').style.display = 'none';
    }
    star_challenge_2_dist_mult = 1;
    star_challenge_3_reset_cnt = 0;
    velocity.to(0, 0), distance = start_distance, acceleration.to(0, 0), mass = base_mass, stellar_charge = base_stellar_charge, cur_stellar_turbo = 0, cur_stellar_flow = 0;
    E0 = E0_base, E1 = E1_base;
    for (let i = 1; i <= substance_category_cnt; i++) {
        substance_cnt[i] = 0;
        substance_cost[i] = substance_base[i];
    }
    for (let i = 1; i <= automation_category_cnt; i++) {
        automation_unlocked[i] = 0;
    }
    statistics[3] = 0, statistics[10] = 0;
    challenges_01_tick = challenges_01_full_tick;
    if (star_challenges_level[1] >= 2) mach_point.to(1, 20);
    else mach_point.to(0, 0);
    for (let i = 1; i <= mach_col; i++) {
        mach_upgrade_disabled[i] = 0;
        if (star_challenges_level[1] >= 3) mach_upgrade_unlocked[4][i] = 1e20;
        else mach_upgrade_unlocked[4][i] = 1e10;
    }
    mach_upgrade_43_tmp = 0;
    if (!achievements_unlocked[18]) {
        for (let i = 1; i <= mach_row; i++) {
            for (let j = 1; j <= mach_col; j++) {
                mach_upgrade_unlocked[i][j] = 0;
            }
        }
    } else {
        substance_cnt[4] = 2;
    }
    if (!achievements_unlocked[19]) {
        mach_broken = 0;
        for (let i = 1; i <= break_mach_row; i++) {
            for (let j = 1; j <= break_mach_col; j++) {
                break_mach_upgrade_unlocked[i][j] = 0;
            }
        }
    }
    if (!achievements_unlocked[29])
        broken_heart.to(0, 0);
    star_upgrade_17_max = 0;
    if (ch < 6) {
        restriction_selected_cnt = 0, restriction_activated_cnt = 0;
        for (let i = 1; i <= restriction_category_cnt; i++) {
            restriction_selected[i] = 0, restriction_activated[i] = 0;
        }
    }
    if (current_challenge >= 6) cur_star_point += star_challenges_star_point_requirement[current_challenge - 5];
    if (ch >= 6) cur_star_point -= star_challenges_star_point_requirement[ch - 5];
    current_challenge = ch;
    if (star_challenges_level[1] < 1) {
        for (let i = 1; i <= challenges_category_cnt; i++) {
            challenges_unlocked[i] = 0, challenges_level[i] = 0;
        }
    }
    statistics[4] = 0, statistics[5] = 10.0;
    init_cost();
}
function stars_reset() {
    let nsp = stars_formula(0), delta_point = 0;
    if (nsp > star_point) delta_point = nsp - star_point, star_point = nsp;
    cur_star_point += delta_point;
    if (delta_point >= 5 && blackhole_mode) unlock_achievements(1, 0, 1006);
    basic_reset();
    if (to_respec == 1) {
        for (let i = 1; i <= 38; i++)
            if (stars_upgrade_unlocked[i])
                stars_upgrade_unlocked[i] = 0, cur_star_point += stars_upgrade_cost[i];
        to_respec = 0;
    }
    if (achievements_unlocked[18] == 0) {
        document.getElementById('fullscreen').style.display = '';
        full_f = 3;
    }
}
function print_stars() {
    let txt = ['禁', '启'];
    outrange += 0.05 * outrange_dir;
    if (outrange >= 20) outrange_dir = -1;
    if (outrange <= 0) outrange_dir = 1;
    if (current_page != 'menu5') return;
    if (relative_upgrade_unlocked[4][3] && !dream_mode) document.getElementById('b_stars_reset_val').innerHTML = sci_num(stars_formula(0));
    else document.getElementById('b_stars_reset_val').innerHTML = String(stars_formula(0));
    if (relative_upgrade_unlocked[4][3] && !dream_mode) document.getElementById('b_stars_reset_next').style.display = 'none';
    else document.getElementById('b_stars_reset_next').innerHTML = sci_num(1.00e5 * Math.pow(star_point_base, stars_formula(0) - extra_point));
    if (relative_upgrade_unlocked[4][3] && !dream_mode) document.getElementById('stars_textii_val').innerHTML = sci_num(cur_star_point) + ' /' + sci_num(star_point);
    else document.getElementById('stars_textii_val').innerHTML = String(cur_star_point) + ' /' + String(star_point);
    document.getElementById('e0_pow_val').innerHTML = sci_num(E0_pow);
    document.getElementById('b_stars_respec_val').innerHTML = txt[to_respec];
    if (to_respec == 1) {
        document.getElementById('b_stars_respec').style.backgroundColor = '#002099';
        document.getElementById('b_stars_respec').style.color = '#ffffff';
    } else {
        document.getElementById('b_stars_respec').style.backgroundColor = '';
        document.getElementById('b_stars_respec').style.color = '';
    }
    for (let i = 1; i <= stars_upgrade_category_cnt; i++) {
        let str = 'b_starsup' + stars_upgrade_codelist[i];
        if (stars_upgrade_unlocked[i] == 0) {
            document.getElementById(str).style.backgroundColor = '';
            document.getElementById(str + 'sm').style.backgroundColor = '';
            document.getElementById(str).style.color = '';
            document.getElementById(str + 'sm').style.color = '';
        } else {
            if (i == 15 || i == 18 || i == 21) {
                document.getElementById(str).style.backgroundColor = '#00cc00';
                document.getElementById(str + 'sm').style.backgroundColor = '#00cc00';
            } else if (i == 16 || i == 19 || i == 22) {
                document.getElementById(str).style.backgroundColor = '#0077ff';
                document.getElementById(str + 'sm').style.backgroundColor = '#0077ff';
            } else if (i == 17 || i == 20 || i == 23) {
                document.getElementById(str).style.backgroundColor = '#ff7700';
                document.getElementById(str + 'sm').style.backgroundColor = '#ff7700';
            } else if (i == 25 || i == 28 || i == 31) {
                document.getElementById(str).style.backgroundColor = '#ff0000';
                document.getElementById(str + 'sm').style.backgroundColor = '#ff0000';
            } else if (i == 26 || i == 29 || i == 32) {
                document.getElementById(str).style.backgroundColor = '#4000ff';
                document.getElementById(str + 'sm').style.backgroundColor = '#4000ff';
            } else if (i == 27 || i == 30 || i == 33) {
                document.getElementById(str).style.backgroundColor = '#4f4e1b';
                document.getElementById(str + 'sm').style.backgroundColor = '#4f4e1b';
            } else if (i == 34) {
                const rgbColor = `rgb(${rc_r}, ${rc_g}, ${rc_b})`;
                document.getElementById(str).style.backgroundColor = rgbColor;
                document.getElementById(str + 'sm').style.backgroundColor = rgbColor;
                if (rc_f == 1) {
                    rc_r -= 1, rc_g += 1;
                    if (rc_r == 0) rc_f = 2;
                } else if (rc_f == 2) {
                    rc_g -= 1, rc_b += 1;
                    if (rc_g == 0) rc_f = 3;
                } else if (rc_f == 3) {
                    rc_b -= 1, rc_r += 1;
                    if (rc_b == 0) rc_f = 1;
                }
            } else if (i == 39) {
                document.getElementById(str).style.backgroundColor = '#000000';
                document.getElementById(str).style.boxShadow = 'inset 0 0 ' + String(Math.floor(outrange)) + 'px ' + String(Math.floor(outrange)) + 'px rgba(255,0,238,0.5)';
                document.getElementById(str + 'sm').style.backgroundColor = '#000000';
                document.getElementById(str + 'sm').style.boxShadow = 'inset 0 0 ' + String(Math.floor(outrange * 0.25)) + 'px ' + String(Math.floor(outrange * 0.25)) + 'px rgba(255,0,238,0.5)';
            } else {
                document.getElementById(str).style.backgroundColor = '#002099';
                document.getElementById(str + 'sm').style.backgroundColor = '#002099';
            }
            document.getElementById(str).style.color = '#ffffff';
            document.getElementById(str + 'sm').style.color = '#ffffff';
        }
    }
    document.getElementById('b_starsup21_val').innerHTML = sci_num(stars_formula(5));
    document.getElementById('b_starsup23_val').innerHTML = sci_num(stars_formula(7), 0, 3);
    document.getElementById('b_starsup32_val').innerHTML = sci_num(stars_formula(9));
    document.getElementById('b_starsup33_val').innerHTML = sci_num(stars_formula(10));
    document.getElementById('b_starsup62_val').innerHTML = sci_num(stars_formula(16));
    document.getElementById('b_starsup63_val').innerHTML = sci_num(stars_formula(17), 0, 3);
    document.getElementById('b_starsup71_val').innerHTML = sci_num(stars_formula(18));
    document.getElementById('b_starsup72_val').innerHTML = sci_num(stars_formula(19));
    document.getElementById('b_starsup73_val').innerHTML = sci_num(stars_formula(20));
    document.getElementById('b_starsup103_val').innerHTML = sci_num(stars_formula(27), 1);
    document.getElementById('b_starsup111_val').innerHTML = sci_num(stars_formula(28));
    document.getElementById('b_starsup113_val').innerHTML = sci_num(stars_formula(30));
    document.getElementById('b_starsup121_val').innerHTML = sci_num(stars_formula(31));
    document.getElementById('b_starsup123_val').innerHTML = sci_num(stars_formula(33));
    document.getElementById('b_starsup141_val').innerHTML = f_sci_num(stars_formula(36));
    document.getElementById('b_starsup151_val').innerHTML = sci_num(stars_formula(37));
    document.getElementById('b_starsup152_val').innerHTML = sci_num(stars_formula(38));
}
function switch_respec() {
    to_respec = 1 - to_respec;
}
function stars_upgradable(code) {
    if (stars_upgrade_unlocked[code]) return false;
    if (code >= 2 && code <= 4 && !stars_upgrade_unlocked[1]) return false;
    if (code >= 5 && code <= 10 && !stars_upgrade_unlocked[code - 3]) return false;
    if ((code == 11 || code == 12) && !(stars_upgrade_unlocked[code - 3] || stars_upgrade_unlocked[code - 2])) return false;
    if (code == 13 && !(stars_upgrade_unlocked[11] || stars_upgrade_unlocked[12])) return false;
    if (code >= 14 && code <= 17 && !stars_upgrade_unlocked[13]) return false;
    let div1 = stars_upgrade_unlocked[15] + stars_upgrade_unlocked[16] + stars_upgrade_unlocked[17];
    if (code >= 15 && code <= 17 && div1 >= 1 + relative_upgrade_unlocked[2][1]) return false;
    if (code >= 18 && code <= 23 && !stars_upgrade_unlocked[code - 3]) return false;
    if (code == 24 && !(stars_upgrade_unlocked[21] || stars_upgrade_unlocked[22] || stars_upgrade_unlocked[23])) return false;
    if (code >= 25 && code <= 27 && !stars_upgrade_unlocked[24]) return false;
    if (code >= 28 && code <= 33 && !stars_upgrade_unlocked[code - 3]) return false;
    let div2 = stars_upgrade_unlocked[25] + stars_upgrade_unlocked[26] + stars_upgrade_unlocked[27] + stars_upgrade_unlocked[34];
    if ((code >= 25 && code <= 27 || code == 34) && div2 >= 1 + relative_upgrade_unlocked[2][1]) return false;
    if (code == 34 && !stars_upgrade_unlocked[24]) return false;
    if (code >= 35 && code <= 36 && !stars_upgrade_unlocked[34]) return false;
    if (code >= 37 && code <= 38 && !stars_upgrade_unlocked[36]) return false;
    if (code == 39 && (!(stars_upgrade_unlocked[37] || stars_upgrade_unlocked[38]) || statistics[4] < 3.00e6)) return false;
    if (cur_star_point < stars_upgrade_cost[code]) return false;
    return true;
}
function stars_upgrade(code) {
    if (stars_upgradable(code)) {
        cur_star_point -= stars_upgrade_cost[code];
        stars_upgrade_unlocked[code] = 1;
    }
}
function stars_formula(code) {//0--sp获取公式 -1--恒星引擎涡轮机公式
    let cv = 1.00e5;
    if (code == -1) {
        if (stellar_charge.low_get() < 11 || !stars_upgrade_unlocked[1] || !substance_cnt[5]) return 0;
        let ncst = high_log10(stellar_charge);
        if (stars_upgrade_unlocked[3]) ncst *= stars_formula(3);
        if (stars_upgrade_unlocked[15]) ncst *= stars_formula(15);
        cur_stellar_turbo = Math.max(cur_stellar_turbo, Math.floor(ncst));
        return cur_stellar_turbo;
    } else if (code == 0) {
        extra_point = 0;
        if (star_challenges_level[4] >= 1) {
            extra_point += Math.floor(Math.log10(statistics[2]));
            let m = Math.log10(star_challenges_reward[4][star_challenges_level[4]]);
            extra_point = Math.floor(extra_point / m);
        }
        for (let i = 0; ; i++) {
            if (statistics[4] > cv)
                cv *= star_point_base;
            else {
                if (i + extra_point < star_point) return star_point;
                return i + extra_point;
            }
        }
    } else if (code == 2) {
        return 1.13;
    } else if (code == 3) {
        return 1.4307;
    } else if (code == 4) {
        return 0.011;
    } else if (code == 5) {
        if (broken_heart.low_get() == 0) return 1;
        return 0.03 * high_log(broken_heart) + 1;
    } else if (code == 7) {
        if (velocity.low_get() == 0) return 0;
        return 0.02 * high_log(velocity) / Math.log(3e8);
    } else if (code == 8) {
        return 6;
    } else if (code == 9) {
        return 0.008 * achievements_level;
    } else if (code == 10) {
        if (substance_cnt[4] == 0) return 1;
        return Math.pow(1.5, substance_cnt[4]);
    } else if (code == 11) {
        return 1e7;
    } else if (code == 12) {
        return 75;
    } else if (code == 13) {
        if (stellar_charge.low_get < 11 || !stars_upgrade_unlocked[13] || !substance_cnt[5]) return 0;
        let ncst = high_log10(stellar_charge) / 20.0;
        if (stars_upgrade_unlocked[23]) ncst *= (20.0 / 16.0);
        cur_stellar_flow = Math.max(cur_stellar_flow, Math.floor(ncst));
        return cur_stellar_flow;
    } else if (code == 15) {
        return 2.3240;
    } else if (code == 16) {
        if (statistics[10] < 100) return 1;
        return Math.pow(4, Math.log10(statistics[10] / 10));
    } else if (code == 17) {
        let res = 0;
        if (mach_point.low_get() >= 10) res = 0.001 * Math.log(high_log10(mach_point));
        if (res > 0.02) res = 0.02;
        star_upgrade_17_max = Math.max(star_upgrade_17_max, res);
        return star_upgrade_17_max;
    } else if (code == 18) {
        if (achievements_level == 0) return 1;
        return Math.pow(3.75, achievements_level);
    } else if (code == 19) {
        if (achievements_level == 0) return 1;
        return Math.pow(achievements_level, 1.45);
    } else if (code == 20) {
        if (achievements_level == 0) return 0;
        return 0.12 * achievements_level;
    } else if (code == 21) {
        return 0.013;
    } else if (code == 22) {
        return 0.35;
    } else if (code == 25) {
        return 52;
    } else if (code == 26) {
        return 136;
    } else if (code == 27) {
        if (statistics[10] < 100) return 1;
        return Math.floor(Math.pow(3, Math.log10(statistics[10] / 10)));
    } else if (code == 28) {
        if (velocity.low_get() < 10) return 1;
        return high_log10(velocity);
    } else if (code == 30) {
        if (statistics[10] < 100) return 0;
        return 0.125 * Math.log10(statistics[10] / 10);
    } else if (code == 31) {
        if (statistics[3] < 100) return 2147483648;
        return 2147483648 / (statistics[3] / 100);
    } else if (code == 32) {
        return 16777216;
    } else if (code == 33) {
        return 32768 * (statistics[3] / 100);
    } else if (code == 36) {
        if (mach_point.low_get() <= 1) return new Float(1, 0);
        if (high_larger(mach_point, max_mach_point)) max_mach_point = mach_point;
        return max_mach_point;
    } else if (code == 37) {
        if (max_mach_point.low_get() <= 10) return 1;
        return high_log10(max_mach_point) * high_log10(max_mach_point);
    } else if (code == 38) {
        if (max_mach_point.low_get() <= 10) return 0;
        return 0.065 * high_log10(max_mach_point);
    }
}