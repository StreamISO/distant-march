function soft_reset() {
    velocity.to(0, 0), distance = start_distance, acceleration.to(0, 0), mass = base_mass, cur_stellar_turbo = 0, cur_stellar_flow = 0;
    if (stars_upgrade_unlocked[14]) stellar_charge = low_pow(stellar_charge, 0.5);
    else stellar_charge = base_stellar_charge;
    E0 = E0_base, E1 = E1_base;
    statistics[4] = 0.0, statistics[5] = 10.0;
    for (let i = 1; i <= substance_category_cnt; i++) {
        substance_cnt[i] = 0;
        substance_cost[i] = substance_base[i];
    }
    if (mach_upgrade_unlocked[7][2]) substance_cnt[4] += 2;
    statistics[3] = 0;
    challenges_01_tick = challenges_01_full_tick;
    star_challenge_3_reset_cnt += 1;
    if (current_challenge == 8 && star_challenge_3_reset_cnt > 3) basic_reset();
}
function print_challenges() {
    let txt = ['禁', '启'];
    if (mach_broken) challenges_unlocked[0] = 1;
    if (star_point > 0) star_challenges_unlocked[0] = 1;
    if (current_page != 'menu7') return;
    for (let i = 1; i <= restriction_category_cnt; i++) {
        document.getElementById('b_re' + String(i) + '_val').innerHTML = txt[restriction_selected[i]];
        if (restriction_activated[i] == 1 && current_challenge >= 6) {
            document.getElementById('b_re' + String(i)).style.backgroundColor = '#002099';
            document.getElementById('b_re' + String(i)).style.color = '';
        }
        else {
            if (restriction_activated[i] == 1) document.getElementById('b_re' + String(i)).style.backgroundColor = '#00aa00';
            else document.getElementById('b_re' + String(i)).style.backgroundColor = '';
            document.getElementById('b_re' + String(i)).style.color = '';
        }
    }
    document.getElementById('b_re_act_val').innerHTML = String(restriction_selected_cnt);
    for (let i = 1; i <= challenges_category_cnt; i++) {
        let str = '';
        if (statistics[1] >= challenges_unlock_requirement[i]) challenges_unlocked[i] = 1;
        if (!challenges_unlocked[i]) str = '速度达到 ' + sci_num(challenges_unlock_requirement[i]) + 'm/s 解锁';
        else str = challenges_name[i] + ' [目标: ' + sci_num(challenges_requirement[i]) + 'm/s]';
        document.getElementById('b_ch' + String(i) + 'i').innerHTML = str;
        if (i == current_challenge) {
            document.getElementById('b_ch' + String(i)).style.backgroundColor = '#00aa00';
            document.getElementById('b_ch' + String(i) + '_val').innerHTML = 1 + restriction_activated_cnt;
        }
        else {
            document.getElementById('b_ch' + String(i)).style.backgroundColor = '';
            document.getElementById('b_ch' + String(i) + '_val').innerHTML = 1 + restriction_selected_cnt;
        }
        for (let j = 1; j <= restriction_category_cnt + 1; j++) {
            document.getElementById('b_ch' + String(i) + 'ir_val' + String(j)).innerHTML = challenges_reward[i][j];
        }
        for (let j = 1; j <= restriction_category_cnt + 1; j++) {
            if (j == challenges_level[i])
                document.getElementById('b_ch' + String(i) + 'ir_val' + String(j)).style.backgroundColor = '#00aa00';
            else
                document.getElementById('b_ch' + String(i) + 'ir_val' + String(j)).style.backgroundColor = '';
        }
    }
    if (dream_mode && challenges_level[3] >= 5 && statistics[11] % 400 >= 200) {
        document.getElementById('b_ch3i').innerHTML = '3.落红 (大幅增加空气阻力, 鏁存祦缃╁彲浠ュ姞寮虹�庡績) [目标: @NaN?m/s]';
    }
    for (let i = 1; i <= star_challenges_category_cnt; i++) {
        let str = '';
        if (statistics[1] >= star_challenges_unlock_requirement[i]) star_challenges_unlocked[i] = 1;
        if (!star_challenges_unlocked[i]) str = '速度达到 ' + sci_num(star_challenges_unlock_requirement[i]) + 'm/s 解锁';
        else str = star_challenges_name[i] + ' [目标: ' + sci_num(star_challenges_requirement[i]) + 'm/s]';
        document.getElementById('b_sch' + String(i) + 'i').innerHTML = str;
        if (i == current_challenge - 5) {
            document.getElementById('b_sch' + String(i)).style.backgroundColor = '#002099';
            document.getElementById('b_sch' + String(i)).style.color = '#ffffff';
            document.getElementById('b_sch' + String(i) + '_val').innerHTML = 1 + restriction_activated_cnt;
        }
        else {
            document.getElementById('b_sch' + String(i)).style.backgroundColor = '';
            document.getElementById('b_sch' + String(i)).style.color = '';
            document.getElementById('b_sch' + String(i) + '_val').innerHTML = 1 + restriction_selected_cnt;
        }
        for (let j = 1; j <= restriction_category_cnt + 1; j++) {
            if (i != 1) {
                if (i == 3 || i == 4) {
                    document.getElementById('b_sch' + String(i) + 'ir_val' + String(j)).innerHTML = sci_num(star_challenges_reward[i][j]);
                } else
                    document.getElementById('b_sch' + String(i) + 'ir_val' + String(j)).innerHTML = star_challenges_reward[i][j];
            }
        }
        for (let j = 1; j <= restriction_category_cnt + 1; j++) {
            if (i == 1) {
                if (j <= star_challenges_level[i]) {
                    document.getElementById('b_sch' + String(i) + 'ir_val' + String(j)).style.backgroundColor = '#002099';
                    document.getElementById('b_sch' + String(i) + 'ir_val' + String(j)).style.color = '#ffffff';
                } else {
                    document.getElementById('b_sch' + String(i) + 'ir_val' + String(j)).style.backgroundColor = '';
                    document.getElementById('b_sch' + String(i) + 'ir_val' + String(j)).style.color = '';
                }
            } else {
                if (j == star_challenges_level[i]) {
                    document.getElementById('b_sch' + String(i) + 'ir_val' + String(j)).style.backgroundColor = '#002099';
                    document.getElementById('b_sch' + String(i) + 'ir_val' + String(j)).style.color = '#ffffff';
                } else {
                    document.getElementById('b_sch' + String(i) + 'ir_val' + String(j)).style.backgroundColor = '';
                    document.getElementById('b_sch' + String(i) + 'ir_val' + String(j)).style.color = '';
                }
            }
        }
    }
}
function switch_restriction(x) {
    restriction_selected[x] = 1 - restriction_selected[x];
    if (restriction_selected[x] == 1) restriction_selected_cnt += 1;
    else restriction_selected_cnt -= 1;
}
function activate_restriction(keep = 0) {
    if (!keep) {
        restriction_activated_cnt = 0;
        for (let i = 1; i <= restriction_category_cnt; i++) {
            restriction_activated_cnt += restriction_selected[i];
            restriction_activated[i] = restriction_selected[i];
            if (restriction_selected[i] == 1) restriction_selected_cnt -= 1;
            restriction_selected[i] = 0;
        }
    }
    if (current_challenge >= 6) basic_reset(current_challenge);
    else soft_reset();
}
function switch_challenges(x) {
    if (x >= 6 && cur_star_point < star_challenges_star_point_requirement[x - 5]) return false;
    if (current_challenge >= 6 && x <= 5) return false;
    if ((x <= 5 && !challenges_unlocked[x]) || (x >= 6 && !star_challenges_unlocked[x - 5])) return false;
    if (current_challenge >= 6) cur_star_point += star_challenges_star_point_requirement[current_challenge - 5];
    if (x >= 6) cur_star_point -= star_challenges_star_point_requirement[x - 5];
    current_challenge = x;
    activate_restriction();
    return true;
}
function complete_challenges() {
    if (dream_mode && challenges_level[3] >= 5) {
        challenges_requirement[3] = 1.00e15;
    } else {
        challenges_requirement[3] = 3.75e3;
    }
    if (current_challenge >= 1 && current_challenge <= 5 && velocity.low_get() >= challenges_requirement[current_challenge]) {
        if (current_challenge == 5 && blackhole_mode) {
            unlock_achievements(1, current_challenge, 1003);
        }
        challenges_level[current_challenge] = Math.max(challenges_level[current_challenge], (1 + restriction_activated_cnt));
        unlock_achievements(1, current_challenge);
        current_challenge = 0;
        activate_restriction();
    }
    if (current_challenge >= 6 && velocity.low_get() >= star_challenges_requirement[current_challenge - 5]) {
        star_challenges_level[current_challenge - 5] = Math.max(star_challenges_level[current_challenge - 5], (1 + restriction_activated_cnt));
        unlock_achievements(1, current_challenge);
        cur_star_point += star_challenges_star_point_requirement[current_challenge - 5];
        current_challenge = 0;
        activate_restriction();
    }
}