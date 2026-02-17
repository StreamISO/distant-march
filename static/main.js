function disable_buttons() {
    //substance
    for (let i = 1; i <= substance_category_cnt; i++)
        document.getElementById('b_ss' + String(i)).disabled = !substance_affordable(i);
    //mach
    for (let i = 1; i <= mach_row; i++) {
        for (let j = 1; j <= mach_col; j++) {
            document.getElementById('b_machup' + String(i) + String(j)).disabled = !mach_upgradable(i, j);
        }
    }
    //break_mach
    for (let i = 1; i <= break_mach_row; i++) {
        for (let j = 1; j <= break_mach_col; j++) {
            document.getElementById('b_break_machup' + String(i) + String(j)).disabled = !break_mach_upgradable(i, j);
        }
    }
    //stars
    for (let i = 1; i <= stars_upgrade_category_cnt; i++) {
        document.getElementById('b_starsup' + stars_upgrade_codelist[i]).disabled = !stars_upgradable(i);
        document.getElementById('b_starsup' + stars_upgrade_codelist[i] + 'sm').disabled = !stars_upgradable(i);
    }
    //relative
    document.getElementById('b_matrix_reset').disabled = statistics[4] < 3.00e6 || !stars_upgrade_unlocked[39];
    document.getElementById('b_dilation_upgrade').disabled = high_larger(relative_formula(-2), dilated_time);
    for (let i = 1; i <= relative_row; i++) {
        for (let j = 1; j <= relative_col; j++) {
            document.getElementById('b_relativeup' + String(i) + String(j)).disabled = !relative_upgradable(i, j);
        }
    }
    document.getElementById('b_remove').disabled = blackhole_mode;
    //challenges
    document.getElementById('b_re_act').disabled = current_challenge != 0;
    document.getElementById('b_exit_ch').disabled = current_challenge >= 6;
}
function change_page(page, m_page = -1) {
    if (page == current_page && m_page == minor_page)
        return;
    let option = parseInt(page[4]);
    let lastoption = parseInt(current_page[4]);
    let lastm_page = minor_page[lastoption];
    let vanish, appear, m_vanish, m_appear;
    vanish = document.getElementById(current_page);
    vanish.style.color = '';
    appear = document.getElementById(page);
    appear.style.color = 'blue';
    if (m_page == -1) m_page = minor_page[option];
    if (current_page == page && m_page != minor_page[option]) {
        m_vanish = document.getElementById(current_page + 'm' + String(lastm_page));
        m_vanish.style.color = '';
        m_appear = document.getElementById(page + 'm' + String(m_page));
        m_appear.style.color = 'blue';
    }
    if (page == current_page) minor_page[lastoption] = m_page;
    current_page = page;
    if (option == 1) print_substance();
    else if (option == 2) print_automation();
    else if (option == 3) print_mach();
    else if (option == 4) print_break_mach();
    else if (option == 5) print_stars();
    else if (option == 6) print_relative();
    else if (option == 7) print_challenges();
    else if (option == 8) print_statistics();
    else if (option == 9) print_achievements();
    //substance
    into('substance', lastoption == 1, option == 1);
    for (let i = 1; i <= substance_category_cnt; i++) {
        let str = 'ss' + String(i);
        if ((i != 4 || mach_upgrade_unlocked[6][2]) && (i != 5 || stars_upgrade_unlocked[1] == 1)) {
            into(str, lastoption == 1, option == 1);
            into(str + 'i', lastoption == 1, option == 1);
            into('b_' + str, lastoption == 1, option == 1);
        }
    }
    into('target', lastoption == 1, option == 1);
    into('target_bar', lastoption == 1, option == 1);
    into('target_text', lastoption == 1, option == 1);
    //automation
    into('automation', lastoption == 2, option == 2);
    for (let i = 1; i <= automation_category_cnt; i++) {
        if (automation_unlocked[i]) {
            into('b_au' + String(i), lastoption == 2 || lastm_page != 1, option == 2 && m_page == 1);
            if (i == 5 || i == 8) {
                into('b_au' + String(i) + '_input', lastoption == 2 || lastm_page != 1, option == 2 && m_page == 1);
                into('b_au' + String(i) + '_inputi', lastoption == 2 || lastm_page != 1, option == 2 && m_page == 1);
                if (i == 5)
                    document.getElementById('b_au' + String(i) + '_input').value = f_sci_num(automation_5_trigger, 1);
                else if (i == 8)
                    document.getElementById('b_au' + String(i) + '_input').value = sci_num(automation_8_trigger);
            }
        }
    }
    into('automator_input', lastoption == 2 || lastm_page != 2, option == 2 && m_page == 2);
    into('b_at1', lastoption == 2 || lastm_page != 2, option == 2 && m_page == 2);
    into('b_at2', lastoption == 2 || lastm_page != 2, option == 2 && m_page == 2);
    into('b_at3', lastoption == 2 || lastm_page != 2, option == 2 && m_page == 2);
    into('b_at4', lastoption == 2 || lastm_page != 2, option == 2 && m_page == 2);
    into('menu2m1', lastoption == 2, option == 2);
    if (relative_upgrade_unlocked[1][4]) into('menu2m2', lastoption == 2, option == 2);
    //mach
    into('mach', lastoption == 3, option == 3);
    into('mhptext', lastoption == 3, option == 3);
    into('mhptexti', lastoption == 3, option == 3);
    into('machup_4_input', lastoption == 3, option == 3);
    into('machup_4_inputi', lastoption == 3, option == 3);
    for (let i = 1; i <= mach_row; i++) {
        for (let j = 1; j <= mach_col; j++) {
            into('b_machup' + String(i) + String(j), lastoption == 3, option == 3);
        }
    }
    //break_mach
    into('break_mach', lastoption == 4, option == 4);
    into('break_mhptext', lastoption == 4, option == 4);
    if (broken_heart.low_get() >= 1) into('break_bhtext', lastoption == 4, option == 4);
    into('break_mhptexti', lastoption == 4, option == 4);
    into('break_mhptextii', lastoption == 4, option == 4);
    into('b_break_mach', lastoption == 4, option == 4);
    for (let i = 1; i <= break_mach_row; i++) {
        for (let j = 1; j <= break_mach_col; j++) {
            into('b_break_machup' + String(i) + String(j), lastoption == 4, option == 4);
        }
    }
    //stars
    into('stars', lastoption == 5, option == 5);
    into('b_stars_reset', lastoption == 5, option == 5);
    into('stars_texti', lastoption == 5, option == 5);
    into('stars_textii', lastoption == 5, option == 5);
    into('t_starsupi', lastoption == 5, option == 5);
    into('b_stars_respec', lastoption == 5, option == 5);
    for (let i = 1; i <= stars_upgrade_category_cnt; i++) {
        let str = '_starsup' + stars_upgrade_codelist[i];
        into('t' + str, lastoption == 5, option == 5);
        into('b' + str, lastoption == 5, option == 5);
        into('b' + str + 'sm', lastoption == 5, option == 5);
    }
    for (let i = 1; i <= line_cnt; i++) {
        let str = 'line' + String(i);
        into(str + 'a', lastoption == 5, option == 5);
        into(str + 'asm', lastoption == 5, option == 5);
        if (needdw[i]) {
            into(str + 'b', lastoption == 5, option == 5);
            into(str + 'bsm', lastoption == 5, option == 5);
        }
    }
    //relative
    into('relative', lastoption == 6, option == 6);
    into('b_matrix_reset', lastoption == 6 || lastm_page != 1, option == 6 && m_page == 1);
    into('b_blackhole', lastoption == 6 || lastm_page != 2, option == 6 && m_page == 2);
    if (dilated_time.low_get() > 0) {
        into('boostersintro', lastoption == 6 || lastm_page != 1, option == 6 && m_page == 1);
        for (let i = 0; i <= 3; i++) {
            into('boosters' + String(i), lastoption == 6 || lastm_page != 1, option == 6 && m_page == 1);
        }
    }
    for (let i = 1; i <= boosters_max_cnt; i++) {
        into('booster' + String(i), lastoption == 6 || lastm_page != 2, option == 6 && m_page == 2);
    }
    if (relative_upgrade_unlocked[3][3]) into('b_swap', lastoption == 6 || lastm_page != 2, option == 6 && m_page == 2);
    if (neutron_star > 0) into('b_remove', lastoption == 6 || lastm_page != 2, option == 6 && m_page == 2);
    into('boosterintro', lastoption == 6 || lastm_page != 2, option == 6 && m_page == 2);
    into('boosterenergy', lastoption == 6 || lastm_page != 2, option == 6 && m_page == 2);
    print_icons();
    into('b_dilation_upgrade', lastoption == 6 || lastm_page != 3, option == 6 && m_page == 3);
    into('menu6m1', lastoption == 6, option == 6);
    into('menu6m2', lastoption == 6, option == 6);
    into('menu6m3', lastoption == 6, option == 6);
    if (dilation_level >= 357) into('menu6m4', lastoption == 6, option == 6);
    for (let i = 1; i <= relative_row; i++) {
        for (let j = 1; j <= relative_col; j++) {
            if (i == 4 && (j == 1 || j == 4)) continue;
            into('t_relativeup' + String(i) + String(j), lastoption == 6 || lastm_page != 3, option == 6 && m_page == 3);
            into('b_relativeup' + String(i) + String(j), lastoption == 6 || lastm_page != 3, option == 6 && m_page == 3);
        }
    }
    if (option != 6 || minor_page[6] != 4) {
        for (let i = 0; i < 3; i++) {
            circle[i].style.display = 'none';
        }
    }
    into('b_dream', lastoption == 6 || lastm_page != 4, option == 6 && m_page == 4);
    into('t_dream', lastoption == 6 || lastm_page != 4, option == 6 && m_page == 4);
    if (dream_mode && velocity.low_get() >= 1314520.00) into('b_dream_complete', lastoption == 6 || lastm_page != 4, option == 6 && m_page == 4);
    //challenges
    into('challenges', lastoption == 7, option == 7);
    into('menu7m1', lastoption == 7, option == 7);
    if (challenges_unlocked[0]) into('menu7m2', lastoption == 7, option == 7);
    if (star_challenges_unlocked[0]) into('menu7m3', lastoption == 7, option == 7);
    into('retexti', lastoption == 7 || lastm_page != 1, option == 7 && m_page == 1);
    for (let i = 1; i <= restriction_category_cnt; i++) {
        let str = 'b_re' + String(i);
        into(str + 'i', lastoption == 7 || lastm_page != 1, option == 7 && m_page == 1);
        into(str, lastoption == 7 || lastm_page != 1, option == 7 && m_page == 1);
    }
    into('b_re_act', lastoption == 7 || lastm_page != 1, option == 7 && m_page == 1);
    into('chtexti', lastoption == 7 || lastm_page != 2, option == 7 && m_page == 2);
    for (let i = 1; i <= challenges_category_cnt; i++) {
        let str = 'b_ch' + String(i);
        if (challenges_unlocked[i]) {
            into(str, lastoption == 7 || lastm_page != 2, option == 7 && m_page == 2);
            into(str + 'ir', lastoption == 7 || lastm_page != 2, option == 7 && m_page == 2);
        }
        into(str + 'i', lastoption == 7 || lastm_page != 2, option == 7 && m_page == 2);
    }
    if (challenges_unlocked[1]) {
        into('b_exit_ch', lastoption == 7 || lastm_page != 2, option == 7 && m_page == 2);
    }
    into('schtexti', lastoption == 7 || lastm_page != 3, option == 7 && m_page == 3);
    for (let i = 1; i <= star_challenges_category_cnt; i++) {
        let str = 'b_sch' + String(i);
        if (star_challenges_unlocked[i]) {
            into(str, lastoption == 7 || lastm_page != 3, option == 7 && m_page == 3);
            into(str + 'ir', lastoption == 7 || lastm_page != 3, option == 7 && m_page == 3);
        }
        into(str + 'i', lastoption == 7 || lastm_page != 3, option == 7 && m_page == 3);
    }
    if (star_challenges_unlocked[0]) {
        into('b_exit_sch', lastoption == 7 || lastm_page != 3, option == 7 && m_page == 3);
    }
    //statistics
    into('statistics', lastoption == 8, option == 8);
    for (let i = 1; i <= statistics_category_cnt; i++) {
        let str = 'st' + String(i);
        into(str, lastoption == 8, option == 8);
    }
    //achievements
    if (option == 9) document.getElementById('title').innerHTML = '缘祯', unlock_signal = 0;
    into('achievements', lastoption == 9, option == 9);
    into('menu9m1', lastoption == 9, option == 9);
    if (stars_upgrade_unlocked[39] || dilated_time.low_get() > 0 || statistics[1] >= 3.00e6) into('menu9m2', lastoption == 9, option == 9);
    into('ac', lastoption == 9 || lastm_page != 1, option == 9 && m_page == 1);
    for (let i = 1; i <= achievements_category_cnt; i++) {
        let str = 'ac' + String(i);
        into(str, lastoption == 9 || lastm_page != 1, option == 9 && m_page == 1);
        into(str + 'i', lastoption == 9 || lastm_page != 1, option == 9 && m_page == 1);
    }
    into('de', lastoption == 9 || lastm_page != 2, option == 9 && m_page == 2);
    for (let i = 1; i <= destinies_category_cnt; i++) {
        let str = 'de' + String(i);
        into(str, lastoption == 9 || lastm_page != 2, option == 9 && m_page == 2);
        into(str + 'i', lastoption == 9 || lastm_page != 2, option == 9 && m_page == 2);
    }
    //settings
    into('settings', lastoption == 0, option == 0);
    into('fileInput', lastoption == 0, option == 0);
    into('import_save', lastoption == 0, option == 0);
    into('export_save', lastoption == 0, option == 0);
    into('caution', lastoption == 0, option == 0);
    into('caution2', lastoption == 0, option == 0);
    into('about', lastoption == 0, option == 0);
    into('intro_link', lastoption == 0, option == 0);
}
function calc_air_force(v) {
    //Air Force
    E0 = E0_base, E1 = E1_base;
    let vdelay = 0;
    if (star_challenges_level[3] >= 1) {
        vdelay += star_challenges_reward[3][star_challenges_level[3]];
    }
    if (blackhole_mode) vdelay = 0;
    if (mach_broken) {
        if ((current_challenge == 3 || current_challenge == 6) && (v.low_get() - vdelay) >= 340.00) {
            E0 += Math.pow((10 * (v.low_get() - vdelay) - 9 * 340.00) / 340.00, 0.5);
            document.getElementById('e0_mult_val').innerHTML = 10;
        } else if ((v.low_get() - vdelay) <= 340) {
            document.getElementById('e0_mult_val').innerHTML = 1;
        } else if ((v.low_get() - vdelay) <= 7.92e3) {
            E0 += Math.pow((v.low_get() - vdelay) / 340.00, 0.5);
            document.getElementById('e0_mult_val').innerHTML = 1;
        } else if ((v.low_get() - vdelay) <= 1.12e4) {
            E0 += Math.pow((2 * (v.low_get() - vdelay) - 7.92e3) / 340.00, 0.5);
            document.getElementById('e0_mult_val').innerHTML = 2;
        } else if ((v.low_get() - vdelay) <= 1.67e4) {
            E0 += Math.pow((3 * (v.low_get() - vdelay) - 2 * 1.12e4) / 340.00, 0.5);
            document.getElementById('e0_mult_val').innerHTML = 3;
        } else if ((v.low_get() - vdelay) <= 1.00e5) {
            E0 += Math.pow((4 * (v.low_get() - vdelay) - 3 * 1.67e4) / 340.00, 0.5);
            document.getElementById('e0_mult_val').innerHTML = 4;
        } else {
            E0_pow = E0_pow_base;
            if ((v.low_get() - vdelay) >= 1.00e6) {
                let apw = high_log10(low_div(low_sub(v, vdelay), 1e5));
                if (current_challenge == 10)
                    E0_pow += 8 * apw * apw - 7.99;
                else {
                    E0_pow += 2 * apw * apw - 1.99 - star_challenges_reward[5][star_challenges_level[5]];
                    if (E0_pow < E0_pow_base) E0_pow = E0_pow_base;
                }
            }
            let pw = Math.pow(high_log(low_sub(v, vdelay)), E0_pow);
            E0 += Math.pow((pw * (v.low_get() - vdelay) - (pw - 1) * 1.00e5) / 340.00, 0.5);
            document.getElementById('e0_mult_val').innerHTML = sci_num(pw);
        }
    }
    E0 *= break_mach_upgrade_formula(0, 2);
    if (break_mach_upgrade_unlocked[1][2]) E0 *= break_mach_upgrade_formula(1, 2);
    if (break_mach_upgrade_unlocked[2][2]) E0 *= break_mach_upgrade_formula(2, 2);
    E1 *= Math.pow((1 - flow_dec), get_flow_cnt());
    let wind = new Float(0, 0);
    if (v.low_get() > 340.00) wind = low_mul(low_pow(v, E0), air_force_a_mult);
    air_force = high_add(wind, high_add(low_mul(low_pow(v, 1 + E1), air_force_d_mult), low_mul(v, air_force_l_mult)));
    return air_force;
}
function calc_velocity() {
    let pp_vel = velocity;
    let nf = new Float(0, 0);
    force.to(0, 0);
    booster_force = booster_base;
    if (current_challenge == 2 || current_challenge == 6) booster_force = new Float(5, 1);
    turbo_mult = turbo_base_mult;
    turbo_mult += challenges_reward[2][challenges_level[2]];
    if (break_mach_upgrade_unlocked[4][3]) turbo_mult += break_mach_upgrade_formula(4, 3);
    if (stars_upgrade_unlocked[9]) turbo_mult += stars_formula(9);
    flow_dec = flow_base_dec;
    flow_0_dec = flow_0_base_dec;
    broken_heart_0_dec = broken_heart_0_base_dec;
    if (break_mach_upgrade_unlocked[4][2]) broken_heart_0_dec -= break_mach_upgrade_formula(4, 2);
    if (stars_upgrade_unlocked[17]) broken_heart_0_dec -= stars_formula(17);
    for (let i = 1; i <= substance_cnt[3] + Math.floor(substance_cnt[3] * challenges_reward[1][challenges_level[1]] / 100.00) + stars_formula(-1); i++)
        booster_force = low_mul(booster_force, turbo_mult);
    if (mach_upgrade_unlocked[1][1]) booster_force = low_mul(booster_force, mach_upgrade_formula(1, 1));
    if (mach_upgrade_unlocked[2][1]) booster_force = low_mul(booster_force, mach_upgrade_formula(2, 1));
    if (mach_upgrade_unlocked[3][1]) booster_force = low_mul(booster_force, mach_upgrade_formula(3, 1));
    if (mach_upgrade_unlocked[4][1]) booster_force = low_mul(booster_force, mach_upgrade_formula(4, 1));
    if (mach_upgrade_unlocked[7][1]) booster_force = low_mul(booster_force, mach_upgrade_formula(7, 1));
    if (stars_upgrade_unlocked[18]) booster_force = low_mul(booster_force, stars_formula(18));
    if (stars_upgrade_unlocked[36]) booster_force = high_mul(booster_force, stars_formula(36));
    if (restriction_activated[3]) booster_force = low_pow(booster_force, 0.3);
    if (current_challenge == 2 || current_challenge == 6) booster_force = low_mul(low_pow(low_div(booster_force, 50), 0.03), 50);
    if (dream_mode) booster_force = low_pow(booster_force, dream_val);
    force = high_add(force, low_mul(booster_force, substance_cnt[1]));
    mass = low_div(force, (light_speed_reality - velocity.low_get()) * 0.5 / 2);
    if (mass.low_get() < 10) mass.to(10 / 2, 0);
    let b_mass = new Float(0, 0);
    if (blackhole_mode) low_div(force, (light_speed_blackhole - velocity.low_get()) * 0.5 / 2);
    if (blackhole_mode && high_larger(b_mass, mass)) mass = b_mass;
    if (time_mult.low_get() < 1) mass = high_div(mass, time_mult);
    nf = high_sub(force, calc_air_force(velocity));
    let bnf = nf;
    do {
        mass = low_mul(mass, 2);
        acceleration = high_div(high_sub(force, calc_air_force(velocity)), mass);
        pp_vel = high_add(velocity, low_mul(acceleration, tick_m));
        nf = high_sub(force, calc_air_force(pp_vel));
    } while (nf.a < 0);
    acceleration = high_div(bnf, mass);
    velocity = high_add(velocity, low_mul(acceleration, tick_m));
}
function calc_dist_mult() {
    dist_mult.to(1, 0);
    counter_mult = counter_base_mult;
    if (mach_upgrade_unlocked[2][2]) counter_mult += mach_upgrade_formula(2, 2);
    if (break_mach_upgrade_unlocked[1][1]) counter_mult += break_mach_upgrade_formula(1, 1);
    for (let i = 1; i <= substance_cnt[2]; i++)
        dist_mult = low_mul(dist_mult, counter_mult);
    if (mach_upgrade_unlocked[1][2]) dist_mult = low_mul(dist_mult, mach_upgrade_formula(1, 2));
    if (mach_upgrade_unlocked[7][3]) dist_mult = low_mul(dist_mult, mach_upgrade_formula(7, 3));
    if (stars_upgrade_unlocked[16]) dist_mult = low_mul(dist_mult, stars_formula(16));
    if (stars_upgrade_unlocked[19]) dist_mult = low_mul(dist_mult, stars_formula(19));
    if (stars_upgrade_unlocked[37]) dist_mult = low_mul(dist_mult, stars_formula(37));
    if (challenges_level[5] > 0 && statistics[3] >= 100) dist_mult = low_mul(dist_mult, Math.pow(challenges_reward[5][challenges_level[5]], Math.log10(statistics[3] / 10)));
    if (current_challenge == 1 || current_challenge == 6) dist_mult = low_mul(dist_mult, parseFloat(challenges_01_tick / challenges_01_full_tick));
    if (current_challenge == 5 || current_challenge == 6) dist_mult = low_mul(dist_mult, Math.pow(0.1, statistics[3] / 1300));
    if (current_challenge == 7) dist_mult = low_mul(dist_mult, star_challenge_2_dist_mult);
    if (stars_upgrade_unlocked[2]) dist_mult = low_pow(dist_mult, stars_formula(2));
    if (restriction_activated[2]) dist_mult = low_pow(dist_mult, restriction_2_mult);
    if (dream_mode) dist_mult = low_pow(dist_mult, dream_val);
}
function calc_time_mult() {
    dilation_mult = time_mult = relative_formula(999);
    let ar = new Float(1, 0);
    if (blackhole_mode) ar = low_sub(ar, velocity.low_get() * velocity.low_get() / light_speed_blackhole / light_speed_blackhole);
    else ar = low_sub(ar, velocity.low_get() * velocity.low_get() / light_speed_reality / light_speed_reality);
    ar = high_div(new Float(1, 0), ar);
    time_mult = high_div(time_mult, low_pow(ar, 77));
}
function print_target() {
    let pt = 0;
    if (dream_mode) {
        document.getElementById('target_texti').innerHTML = '找寻梦境的出路! (1314520m/s)';
        pt = velocity.low_get() / 1314520.0;
    } else if (blackhole_mode) {
        document.getElementById('target_texti').innerHTML = '打破时间裂隙! (340m/s)';
        pt = velocity.low_get() / 340.0;
    } else if (!mach_broken || statistics[4] < 340.0) {
        document.getElementById('target_texti').innerHTML = '达到音速! (340m/s)';
        pt = velocity.low_get() / 340.0;
    } else if (statistics[4] < 7.92e3) {
        document.getElementById('target_texti').innerHTML = '达到初心速度! (7.92e3m/s)';
        pt = velocity.low_get() / 7.92e3;
    } else if (statistics[4] < 1.12e4) {
        document.getElementById('target_texti').innerHTML = '达到次心速度! (1.12e4m/s)';
        pt = velocity.low_get() / 1.12e4;
    } else if (statistics[4] < 1.67e4) {
        document.getElementById('target_texti').innerHTML = '达到叁心速度! (1.67e4m/s)';
        pt = velocity.low_get() / 1.67e4;
    } else if (statistics[4] < 1.00e5) {
        document.getElementById('target_texti').innerHTML = '与流星共舞! (1.00e5m/s)';
        pt = velocity.low_get() / 1.00e5;
    } else if (statistics[4] < 3.00e6) {
        document.getElementById('target_texti').innerHTML = '??? (3.00e6m/s)';
        pt = velocity.low_get() / 3.00e6;
    } else if (statistics[4] < 3.00e8) {
        document.getElementById('target_texti').innerHTML = '最终使命! (3.00e8m/s)';
        pt = velocity.low_get() / 3.00e8;
    }
    if (pt > 1) pt = 1;
    document.getElementById('target_bar').value = pt;
    document.getElementById('target_pt').innerHTML = sci_num(pt * 100.0);
}
function sci_num(x, toint = 0, fix = 2) {
    x = parseFloat(x);
    let flag = x < 1000.0;
    let exp = 0.0;
    if (x >= 1000.0)
        while (x > 9.99) {
            x /= 10.0;
            exp += 1;
        }
    if (toint && flag) x = parseInt(x);
    else x = parseFloat(x).toFixed(fix);
    if (exp != 0)
        return x + 'e' + exp.toString();
    else
        return x;
}
function print_global() {
    if (current_page != 'menu6' || minor_page[6] != 3) {
        document.getElementById('basic_global').style.display = '';
        document.getElementById('relative_global').style.display = 'none';
    } else {
        document.getElementById('basic_global').style.display = 'none';
        document.getElementById('relative_global').style.display = '';
    }
    if (current_page == 'menu1' || current_page == 'menu2' || (current_page == 'menu6' && minor_page[6] != 3) || current_page == 'menu0') document.getElementById('body').style.overflow = 'hidden';
    else document.getElementById('body').style.overflow = 'auto';
    if (mach_upgrade_unlocked[1][4] == 1) document.getElementById('menu2').style.display = '';
    if (statistics[6] >= 1) document.getElementById('menu3').style.display = '';
    if (statistics[7] <= 100 || dilated_time.low_get() > 0) {
        document.getElementById('menu4').style.display = '';
        if (relative_upgrade_unlocked[1][4]) mach_broken = 1;
    }
    if (statistics[1] >= 1.00e5 || star_point >= 1 || dilated_time.low_get() > 0) document.getElementById('menu5').style.display = '';
    if (stars_upgrade_unlocked[39] || dilated_time.low_get() > 0) document.getElementById('menu6').style.display = '';
    if (mach_upgrade_unlocked[5][1] == 1 || star_point > 0 || dilated_time.low_get() > 0) document.getElementById('menu7').style.display = '';
    if (!dream_mode) document.getElementById('vel').innerHTML = f_sci_num(velocity, 0, 2, 1);
    else document.getElementById('vel').innerHTML = velocity.low_get().toFixed(2);
    document.getElementById('dist').innerHTML = f_sci_num(distance, 0, 2, 1);
    document.getElementById('mult').innerHTML = f_sci_num(dist_mult);
    document.getElementById('mode_text_val').innerHTML = '你现在位于----' + mode_name[current_challenge];
    if (blackhole_mode && current_challenge == 0) document.getElementById('mode_text_val').innerHTML = '你现在位于----黑洞视界';
    else if (blackhole_mode) document.getElementById('mode_text_val').innerHTML = '你现在位于----黑洞视界--' + mode_name[current_challenge];
    if (current_challenge == 8) document.getElementById('mode_text_val').innerHTML += '(' + String(star_challenge_3_reset_cnt) + '/3)';
    if (dream_mode) document.getElementById('mode_text_val').innerHTML = '杩欓噷鏄�闀滆姳缂�, 鎴戠埍浠诲彲绁�!';
    if (stars_upgrade_unlocked[39] || dilated_time.low_get() > 0 || statistics[1] >= 3.00e6) document.getElementById('time_text').style.display = '';
    else document.getElementById('time_text').style.display = 'none';
    document.getElementById('time_val').innerHTML = f_sci_num(time_mult);
    if (time_mult.b >= 3) document.getElementById('time_texti').innerHTML = '光阴似箭';
    else if (time_mult.b >= -3) document.getElementById('time_texti').innerHTML = '当前时间倍数';
    else document.getElementById('time_texti').innerHTML = '时间支离破碎';
    document.getElementById('dilated_time').innerHTML = f_sci_num(dilated_time, 0, 2, 1);
    document.getElementById('dilation_level').innerHTML = String(dilation_level);
    document.getElementById('dilation_mult').innerHTML = f_sci_num(dilation_mult);
}
function into(s, v, a) {
    if (v)
        document.getElementById(s).style.display = 'none';
    if (a)
        document.getElementById(s).style.display = '';
}
function init_cost() {
    if (stars_upgrade_unlocked[6]) max_level = 7;
    for (let i = 1; i <= substance_category_cnt; i++)
        substance_creep[i] = substance_base_creep[i];
    break_mach_upgrade_cost[4][2] = 1e15 * Math.pow(1e5, break_mach_upgrade_unlocked[4][2]);
    break_mach_upgrade_cost[4][3] = 1e15 * Math.pow(1e4, break_mach_upgrade_unlocked[4][3]);
    if (mach_upgrade_unlocked[1][3]) substance_creep[1] -= mach_upgrade_formula(1, 3);
    if (mach_upgrade_unlocked[2][3]) substance_creep[1] -= mach_upgrade_formula(2, 3);
    if (mach_upgrade_unlocked[3][3]) substance_creep[1] -= mach_upgrade_formula(3, 3);
    if (mach_upgrade_unlocked[4][3] > 0) {
        let aft = substance_creep[1] / (1 + 0.01 * Math.log10(mach_upgrade_unlocked[4][3]));
        if (aft > 1.21) aft = 1.21;
        if (aft < 1.1) aft = 1.1;
        mach_upgrade_43_tmp = substance_creep[1] - aft;
        substance_creep[1] = aft;
    } else if (mach_upgrade_unlocked[4][3] > 0) {
        mach_upgrade_43_tmp = 0;
    }
    if (stars_upgrade_unlocked[4]) substance_creep[1] -= stars_formula(4);
    if (stars_upgrade_unlocked[7]) substance_creep[1] -= stars_formula(7);
    if (stars_upgrade_unlocked[21]) substance_creep[1] -= stars_formula(21);
    if (restriction_activated[1]) substance_creep[1] = Math.pow(substance_creep[1], restriction_1_add);
    if (mach_upgrade_unlocked[5][3]) substance_creep[2] -= mach_upgrade_formula(5, 3);
    if (mach_upgrade_unlocked[6][3]) substance_creep[2] -= mach_upgrade_formula(6, 3);
    if (break_mach_upgrade_unlocked[2][1]) substance_creep[2] -= break_mach_upgrade_formula(2, 1);
    if (stars_upgrade_unlocked[22]) substance_creep[2] -= stars_formula(22);
    if (star_challenges_level[2] >= 1) substance_creep[2] -= star_challenges_reward[2][star_challenges_level[2]];
    if (mach_upgrade_unlocked[3][2]) substance_creep[3] += mach_upgrade_formula(3, 2);
    if (mach_upgrade_unlocked[5][2]) substance_creep[3] += mach_upgrade_formula(5, 2);
    if (break_mach_upgrade_unlocked[2][3]) substance_creep[3] += break_mach_upgrade_formula(2, 3);
    if (stars_upgrade_unlocked[8]) substance_creep[4] += stars_formula(8);
    for (let i = 1; i <= substance_category_cnt; i++) {
        substance_cost[i] = substance_base[i];
        if (i == 5) continue;
        if (substance_creep[i] > 0) {
            substance_cost[i] = high_mul(substance_cost[i], low_low_pow(substance_creep[i], substance_cnt[i]));
        } else {
            substance_cost[i] = low_sub(substance_cost[i], substance_creep[i] * substance_cnt[i]);
            if (i == 3 && break_mach_upgrade_unlocked[3][3]) {
                substance_cost[i] = low_sub(substance_cost[i], break_mach_upgrade_formula(3, 3));
                if (!low_largere(substance_cost[i], 0)) substance_cost[i].to(0, 0);
            }
        }
    }
}
function calc_time_played(bt) {
    let hh, mm, ss, ms;
    bt = parseInt(bt);
    hh = bt / 360000, bt %= 360000;
    mm = bt / 6000, bt %= 6000;
    ss = bt / 100, bt %= 100;
    ms = bt * 10;
    return [hh, mm, ss, ms];
}
function full_animation() {
    if (full_f == 1) {
        if (full_c < 1) {
            full_c += 0.0025;
            document.getElementById('fullscreen').style.opacity = full_c;
        } else if (full_c > 0.99) {
            change_page('menu1');
            blackhole_mode = 0;
            full_f = 2;
        }
    } else if (full_f == 2) {
        if (full_c > 0) {
            full_c -= 0.005;
        } else if (full_c < 0.01) {
            document.getElementById('fullscreen').style.display = 'none';
            full_f = 0;
        }
    } else if (full_f == 3) {
        document.getElementById('fullscreen').style.backgroundColor = '#ffffff';
        if (full_c < 1) {
            full_c += 0.005;
            document.getElementById('fullscreen').style.opacity = full_c;
        } else if (full_c > 0.99) {
            change_page('menu1');
            full_f = 4;
        }
    } else if (full_f == 4) {
        if (full_c > 0) {
            full_c -= 0.005;
            document.getElementById('fullscreen').style.opacity = full_c;
        } else if (full_c < 0.01) {
            document.getElementById('fullscreen').style.display = 'none';
            document.getElementById('fullscreen').style.backgroundColor = '';
            full_f = 0;
        }
    } else if (full_f == 5) {
        document.getElementById('fullscreen').style.display = '';
        full_c = 1, full_f = 6;
    } else if (full_f == 6) {
        if (full_c > 0) {
            full_c -= 0.025;
            document.getElementById('fullscreen').style.opacity = full_c;
        } else if (full_c <= 0) {
            document.getElementById('fullscreen').style.display = 'none';
            full_f = 0;
        }
    } else if (full_f == 7) {
        document.getElementById('fullscreen').style.display = '';
        document.getElementById('fullscreen').style.backgroundColor = '#ffffff';
        full_c = 1, full_f = 8;
    } else if (full_f == 8) {
        if (full_c > 0) {
            full_c -= 0.025;
            document.getElementById('fullscreen').style.opacity = full_c;
        } else if (full_c <= 0) {
            document.getElementById('fullscreen').style.display = 'none';
            document.getElementById('fullscreen').style.backgroundColor = '';
            full_f = 0;
        }
    } else if (full_f == 1314) {
        change_page('menu1');
        document.getElementById('fullscreen').style.pointerEvents = 'all';
        document.getElementById('fullscreen').style.background = '';
        document.getElementById('fullscreen').style.boxShadow = '';
        document.getElementById('fullscreen').style.backgroundColor = '#ffffff';
        if (full_c < 1) {
            full_c += 0.0025;
            document.getElementById('fullscreen').style.opacity = full_c;
        } else if (full_c > 0.99) {
            full_f = 1315;
        }
    } else if (full_f == 1315) {
        document.getElementById('ending_text').innerHTML = '你达到了光速<br/><br/>你终于追上了她. . . . . .';
        full_f = 1316;
    } else if (full_f == 1316) {
        full_e += 0.004;
        document.getElementById('ending_text').style.opacity = full_e;
        if (full_e > 0.991) full_f = 1317;
    } else if (full_f == 1317) {
        document.getElementById('fullscreen').addEventListener('click', function (event) {
            if (full_f == 1318) full_f = 1319;
        });
        full_f = 1318;
    } else if (full_f == 1319) {
        full_e -= 0.004;
        document.getElementById('ending_text').style.opacity = full_e;
        if (full_e < 0.009) full_f = 1320;
    } else if (full_f == 1320) {
        document.getElementById('ending_text').innerHTML = '惟觉时之枕席, 失向来之烟霞<br/><br/>这只是一场梦. . . . . .';
        full_f = 1321;
    } else if (full_f == 1321) {
        full_e += 0.004;
        document.getElementById('ending_text').style.opacity = full_e;
        if (full_e > 0.991) full_f = 1322;
    } else if (full_f == 1322) {
        document.getElementById('fullscreen').addEventListener('click', function (event) {
            if (full_f == 1323) full_f = 1324;
        });
        full_f = 1323;
    } else if (full_f == 1324) {
        full_e -= 0.004;
        document.getElementById('ending_text').style.opacity = full_e;
        if (full_e < 0.009) full_f = 1325;
    } else if (full_f == 1325) {
        document.getElementById('ending_text').innerHTML = '是啊, 我怎么可能达到光速呢. . . . . .';
        full_f = 1326;
    } else if (full_f == 1326) {
        full_e += 0.004;
        document.getElementById('ending_text').style.opacity = full_e;
        if (full_e > 0.991) full_f = 1327;
    } else if (full_f == 1327) {
        document.getElementById('fullscreen').addEventListener('click', function (event) {
            if (full_f == 1328) full_f = 1329;
        });
        full_f = 1328;
    } else if (full_f == 1329) {
        full_e -= 0.004;
        document.getElementById('ending_text').style.opacity = full_e;
        if (full_e < 0.009) full_f = 1330;
    } else if (full_f == 1330) {
        document.getElementById('ending_text').innerHTML = '但<br/><br/>至少<br/><br/>因为她<br/><br/>我的心里有了一束光. . . . . .';
        full_f = 1331;
    } else if (full_f == 1331) {
        full_e += 0.004;
        document.getElementById('ending_text').style.opacity = full_e;
        if (full_e > 0.991) full_f = 1332;
    } else if (full_f == 1332) {
        document.getElementById('fullscreen').addEventListener('click', function (event) {
            if (full_f == 1333) full_f = 1334;
        });
        full_f = 1333;
    } else if (full_f == 1334) {
        full_e -= 0.004;
        document.getElementById('ending_text').style.opacity = full_e;
        if (full_e < 0.009) full_f = 1335;
    } else if (full_f == 1335) {
        document.getElementById('ending_text').innerHTML = '致谢 (我的启蒙老师): 反物质维度, 猫国建设者, 进化<br/><br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp还有那个可爱的她';
        full_f = 1336;
    } else if (full_f == 1336) {
        full_e += 0.004;
        document.getElementById('ending_text').style.opacity = full_e;
        if (full_e > 0.991) full_f = 1337;
    } else if (full_f == 1337) {
        document.getElementById('fullscreen').addEventListener('click', function (event) {
            if (full_f == 1338) full_f = 1339;
        });
        full_f = 1338;
    } else if (full_f == 1339) {
        full_e -= 0.004;
        document.getElementById('ending_text').style.opacity = full_e;
        if (full_e < 0.009) full_f = 1340;
    } else if (full_f == 1340) {
        if (full_c > 0) {
            full_c -= 0.005;
            document.getElementById('fullscreen').style.opacity = full_c;
        } else if (full_c < 0.01) {
            document.getElementById('fullscreen').style.display = 'none';
            document.getElementById('fullscreen').style.backgroundColor = '';
            document.getElementById('fullscreen').style.pointerEvents = '';
            full_f = 0;
            ending_triggering = 0;
        }
    }
}