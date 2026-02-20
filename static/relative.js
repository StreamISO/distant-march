function matrix_reset() {
    if (valid_operation == 0 && velocity.low_get() >= 3.00e6) unlock_achievements(1, 0, 29);
    valid_operation = 0;
    dilated_time = low_add(dilated_time, relative_formula(-1));
    cur_star_point = 0, star_point = 0, extra_point = 0;
    for (let i = 1; i <= stars_upgrade_category_cnt; i++)
        stars_upgrade_unlocked[i] = 0;
    if (!relative_upgrade_unlocked[1][4]) {
        document.getElementById('menu2').style.display = 'none';
        document.getElementById('menu3').style.display = 'none';
        document.getElementById('menu4').style.display = 'none';
        document.getElementById('menu5').style.display = 'none';
        document.getElementById('menu6').style.display = 'none';
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
    statistics[3] = 0, statistics[10] = 0, statistics[11] = 0;
    challenges_01_tick = challenges_01_full_tick;
    mach_point.to(0, 0);
    mach_upgrade_43_tmp = 0;
    for (let i = 1; i <= mach_col; i++) {
        mach_upgrade_disabled[i] = 0;
        if (relative_upgrade_unlocked[1][4]) mach_upgrade_unlocked[4][i] = 1e10;
    }
    if (!relative_upgrade_unlocked[1][4]) {
        for (let i = 1; i <= mach_row; i++) {
            for (let j = 1; j <= mach_col; j++) {
                mach_upgrade_unlocked[i][j] = 0;
            }
        }
    } else {
        substance_cnt[4] = 2;
    }
    if (!relative_upgrade_unlocked[1][4]) {
        mach_broken = 0;
        for (let i = 1; i <= break_mach_row; i++) {
            for (let j = 1; j <= break_mach_col; j++) {
                break_mach_upgrade_unlocked[i][j] = 0;
            }
        }
    }
    broken_heart.to(0, 0);
    star_upgrade_17_max = 0;
    restriction_selected_cnt = 0, restriction_activated_cnt = 0;
    for (let i = 1; i <= restriction_category_cnt; i++) {
        restriction_selected[i] = 0, restriction_activated[i] = 0;
    }
    current_challenge = 0;
    for (let i = 1; i <= challenges_category_cnt; i++) {
        challenges_unlocked[i] = 0, challenges_level[i] = 0;
    }
    for (let i = 1; i <= star_challenges_category_cnt; i++) {
        if (i == 1 && destinies_unlocked[1]) continue;
        star_challenges_unlocked[i] = 0, star_challenges_level[i] = 0;
    }
    statistics[1] = 0, statistics[2] = 10.0;
    statistics[3] = 0, statistics[4] = 0, statistics[5] = 10.0, statistics[6] = relative_upgrade_unlocked[1][4], statistics[7] = 360000 * 999, statistics[8] = 0, statistics[9] = 360000 * 999;
    init_cost();
    light_speed_blackhole = light_speed_blackhole_base;
    //booster
    if (dilated_time.low_get() < 0.000001) {
        boosters_tot_cnt = 5;
        for (let i = 1; i <= 5; i++) {
            boosters_list[i] = new Bst(1, 1, 20);
            boosters_order[i] = i;
        }
    } else if (booster_selected != 0 && boosters_menu[booster_selected].type == 12) {
        neutron_star += 1;
    } else if (booster_selected != 0 && boosters_tot_cnt < boosters_max_cnt) {
        boosters_tot_cnt += 1;
        boosters_list[boosters_tot_cnt] = boosters_menu[booster_selected];
        boosters_list[boosters_tot_cnt].level = dimension_level;
        boosters_order[boosters_tot_cnt] = boosters_tot_cnt;
    }
    calc_tot_storage();
    booster_energy = booster_tot_storage;
    booster_selected = 0, boosters_menu = [new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0)], booster_spawned = 0;
    dimension_level = 0;
    if (!relative_upgrade_unlocked[1][4])
        document.getElementById('fullscreen').style.display = '', full_f = 1;
    automator_last = 0;
    automator_running = automator_autostart;
}
function print_relative() {
    let txt = ['禁', '启'];
    if (!booster_spawned && velocity.low_get() > 3.00e6) {
        booster_spawned = 1;
        spawn_boosters();
    }
    if (dream_mode && (velocity.low_get() < 3.00e8 || !ending_triggering)) {
        document.getElementById('b_dream_complete').style.boxShadow = 'inset 0 0 ' + String(Math.floor(outrange * 0.75)) + 'px ' + String(Math.floor(outrange * 0.75)) + 'px rgba(25,0,255,0.5)';
        document.getElementById('fullscreen').style.boxShadow = 'inset 0 0 ' + String(Math.floor(outrange * 0.75)) + 'px ' + String(Math.floor(outrange * 0.75)) + 'px rgba(25,0,255,0.5)';
        document.getElementById('fullscreen').style.background = 'transparent';
        document.getElementById('fullscreen').style.display = '';
    } else if ((velocity.low_get() < 3.00e8 || !ending_triggering) && !full_f) {
        document.getElementById('b_dream_complete').style.boxShadow = '';
        document.getElementById('fullscreen').style.boxShadow = '';
        document.getElementById('fullscreen').style.background = '';
        document.getElementById('fullscreen').style.display = 'none';
    }
    if (blackhole_mode) {
        document.getElementById('t_blackhole').style.color = '#000000';
        document.getElementById('b_blackhole').style.backgroundColor = '#ffffff';
        document.getElementById('t_blackhole').innerHTML = '退出黑洞视界';
        document.getElementById('t_blackhole2').innerHTML = '当前相对论光速: <span style="color: #00aa00;">' + sci_num(light_speed_blackhole) + '</span>m/s';
        if (light_speed_blackhole > 7.92e3) {
            let clr = 'aa0000';
            if (time_resistance < 0.000001) clr = '00aa00';
            document.getElementById('t_blackhole2').innerHTML += '<br/>当前时间阻抗: <span style="color: #' + clr + ';">' + sci_num(time_resistance) + '</span>m/s';
        }
        let hgt = '';
        if (current_page == 'menu1' || current_page == 'menu2' || (current_page == 'menu6' && minor_page[6] != 3) || current_page == 'menu0') hgt = '1000';
        else if (current_page == 'menu3' || current_page == 'menu4' || (current_page == 'menu6' && minor_page[6] == 3) || current_page == 'menu7' || current_page == 'menu8') hgt = '2060';
        else if (current_page == 'menu5' || current_page == 'menu9') hgt = '4500';
        document.getElementById('filling').style.height = hgt + 'px';
    } else {
        document.getElementById('t_blackhole').style.color = '#ffffff';
        document.getElementById('b_blackhole').style.backgroundColor = '#000000';
        document.getElementById('t_blackhole').innerHTML = '进入黑洞视界';
        document.getElementById('t_blackhole2').innerHTML = '';
        document.getElementById('filling').style.height = '622px';
    }
    if (blackhole_mode && velocity.low_get() > 340.00) {
        document.getElementById('t_reset1').innerHTML = '你每秒获得 ' + f_sci_num(low_mul(relative_formula(-3), 100)) + 's 膨胀时间';
    }
    if (current_page != 'menu6') return;
    if (minor_page[6] != 3) document.getElementById('relative').style.height = '622px';
    else document.getElementById('relative').style.height = '2060px';
    if (minor_page[6] == 1) {
        if (booster_spawned)
            document.getElementById('boostersintro0').innerHTML = '选择一个黑洞作为矩阵覆写的奖励 (也可以不选)';
        else
            document.getElementById('boostersintro0').innerHTML = '购买相对论升级来查看本轮黑洞';
        document.getElementById('b_matrix_reset_val').innerHTML = String(relative_formula(0));
        document.getElementById('b_matrix_reset_next').innerHTML = sci_num(3.00e6 * (dimension_level + 1) * (dimension_level + 1));
        document.getElementById('b_matrix_reset_val2').innerHTML = sci_num(relative_formula(-1));
        document.getElementById('b_dilation_upgrade_val').innerHTML = f_sci_num(relative_formula(-2));
        for (let i = 0; i <= 3; i++) {
            if (i == booster_selected) {
                if (!blackhole_mode) document.getElementById('boosters' + String(i)).style.boxShadow = '0px 0px 40px #004000';
                else document.getElementById('boosters' + String(i)).style.boxShadow = '0px 0px 30px #ffff00';
            }
            else
                document.getElementById('boosters' + String(i)).style.boxShadow = '';
        }
        document.getElementById('boostersintro1').innerHTML = boosters_name[boosters_menu[booster_selected].type];
        document.getElementById('boostersintro2').innerHTML = boosters_menu[booster_selected].percentage + '%';
        document.getElementById('boostersintro3').innerHTML = boosters_effect[boosters_menu[booster_selected].type];
        document.getElementById('boostersintro4').innerHTML = sci_num(100 * boosters_cost[boosters_menu[booster_selected].type]);
        document.getElementById('boostersintro5').innerHTML = sci_num(boosters_storage[boosters_menu[booster_selected].type]);
    }
    if (minor_page[6] == 2) {
        document.getElementById('boosterenergy1').innerHTML = sci_num(booster_energy);
        document.getElementById('boosterenergy2').innerHTML = sci_num(booster_tot_storage);
        document.getElementById('b_remove_val').innerHTML = String(neutron_star);
    }
    if (minor_page[6] == 3) {
        for (let i = 1; i <= relative_row; i++) {
            for (let j = 1; j <= relative_col; j++) {
                let str = '';
                if (relative_upgrade_unlocked[i][j] == 0) {
                    str = '<span style="color: #ff00dd">' + sci_num(relative_upgrade_cost[i][j], 1) + '</span>s 膨胀时间';
                    document.getElementById('b_relativeup' + String(i) + String(j)).style.backgroundColor = '';
                    document.getElementById('b_relativeup' + String(i) + String(j)).style.color = '';
                } else {
                    document.getElementById('b_relativeup' + String(i) + String(j) + '_req').innerHTML = '';
                    document.getElementById('b_relativeup' + String(i) + String(j)).style.backgroundColor = '#ff00dd';
                    document.getElementById('b_relativeup' + String(i) + String(j)).style.color = '#ffffff';
                }
                document.getElementById('b_relativeup' + String(i) + String(j) + '_cost').innerHTML = str;
            }
        }
        document.getElementById('b_relativeup12_val').innerHTML = f_sci_num(relative_formula(12));
        document.getElementById('b_relativeup22_val').innerHTML = sci_num(relative_formula(22));
        document.getElementById('b_relativeup23_val').innerHTML = sci_num(relative_formula(23));
        document.getElementById('b_relativeup31_val').innerHTML = sci_num(relative_formula(31));
        document.getElementById('b_relativeup32_val').innerHTML = f_sci_num(relative_formula(32));
        document.getElementById('b_relativeup34_val').innerHTML = sci_num(relative_formula(34));
        document.getElementById('b_relativeup43_val').innerHTML = sci_num(relative_formula(43) * 100);
    }
    document.getElementById('b_swap_val').innerHTML = txt[swap_mode];
    if (minor_page[6] == 4) {
        let txt2 = ['進入', '退出'];
        if (dream_completed) document.getElementById('t_dreami').innerHTML = '我也许能帮你一把 (梦境指数 ^' + sci_num(dream_val) + ')';
        else document.getElementById('t_dreami').innerHTML = '完成她的考验就可以解脱';
        document.getElementById('b_dream_val').innerHTML = txt2[dream_mode];
        if (dream_mode) {
            document.getElementById('b_dream_val2').innerHTML = light_speed_reality.toFixed(2);
            document.getElementById('b_dream_val3').innerHTML = dream_val.toFixed(3);
            document.getElementById('b_dream').style.backgroundColor = '#1900ff';
            document.getElementById('b_dream').style.color = '#ffffff';
        } else {
            document.getElementById('b_dream_val2').innerHTML = 1314575;
            document.getElementById('b_dream_val3').innerHTML = 0.53;
            document.getElementById('b_dream').style.backgroundColor = '';
            document.getElementById('b_dream').style.color = '';
        }
        for (let i = 0; i < 3; i++) {
            circle[i].style.display = '';
            circle[i].style.position = 'absolute';
            circle[i].style.top = String(550 - rr[i]) + 'px';
            circle[i].style.left = String(1300 - rr[i]) + 'px';
            circle[i].style.width = String(2 * rr[i]) + 'px';
            circle[i].style.height = String(2 * rr[i]) + 'px';
            circle[i].style.borderRadius = '50%';
            circle[i].style.border = String(7 * ((300 - rr[i]) / 300)) + 'px #1900ff solid';
            circle[i].style.opacity = String((300 - rr[i]) / 300);
            if (dream_mode) rr[i] += 0.5;
            else if (dream_completed) rr[i] += 5;
            if (rr[i] >= 300) rr[i] = 5;
        }
        if (dream_mode || dream_completed) {
            document.getElementById('dots').innerHTML = '';
            dots_cnt += 0.02;
            if (dots_cnt >= 7) dots_cnt = 0;
            for (let i = 1; i <= dots_cnt; i++) {
                document.getElementById('dots').innerHTML += '. ';
            }
        }
    }
}
function select_booster(code) {
    booster_selected = code;
}
function spawn_boosters() {
    for (let i = 1; i <= 3; i++) {
        let rarity = Math.floor(Math.random() * 100);//0-60 Common; 61-80 Unusual; 81-97 Rare; 98-99 Lengendary
        //type
        if (0 <= rarity && rarity <= 60) {
            boosters_menu[i].type = 2 + Math.floor(Math.min(Math.random(), 0.999) * 2);//2-3
        } else if (61 <= rarity && rarity <= 80) {
            boosters_menu[i].type = 4 + Math.floor(Math.min(Math.random(), 0.999) * 4);//4-7
        } else if (81 <= rarity && rarity <= 97) {
            boosters_menu[i].type = 8 + Math.floor(Math.min(Math.random(), 0.999) * 6);//8-13
        } else {
            boosters_menu[i].type = 14 + Math.floor(Math.min(Math.random(), 0.999) * (boosters_category_cnt - 13));//14-?
        }
        //percentage
        let sum = 0;
        for (let j = 1; j <= 10; j++) {
            sum += Math.random() * (5 - relative_upgrade_unlocked[1][3]);
        }
        sum -= relative_formula(23);
        if (sum < 0) sum = 0;
        boosters_menu[i].percentage = Math.floor(sum);
    }
}
function switch_blackhole(unreset = 0) {
    blackhole_mode = 1 - blackhole_mode;
    if (blackhole_mode == 1) full_f = 5, document.getElementById('theme').href = 'static/dark_style.css';
    else full_f = 7, document.getElementById('theme').href = 'static/style.css';
    if (!unreset) stars_reset();
    print_icons();
    if (mau_choice) {
        if (blackhole_mode) document.getElementById('booster' + String(mau_choice)).style.boxShadow = '0px 0px 30px #ffff00';
        else document.getElementById('booster' + String(mau_choice)).style.boxShadow = '0px 0px 40px #004000';
    }
}
function print_icons() {
    if (blackhole_mode) {
        for (let i = 1; i <= boosters_max_cnt; i++) {
            boosters_c[i] = boosters_list[boosters_order[i]];
        }
        display_booster(booster_position, 1);
    } else {
        let arr = 1;
        for (; arr <= boosters_tot_cnt; arr++)
            boosters_c[arr] = boosters_list[arr];
        for (; arr <= boosters_max_cnt; arr++) boosters_c[arr] = new Bst(0, 0, 0);
        document.getElementById('booster' + String(booster_position)).style.boxShadow = '';
    }
    for (let i = 1; i <= boosters_max_cnt + 3; i++) {
        let flag = 0;
        if (i > boosters_max_cnt) flag = 1;
        let str = '';
        if (!flag) str = 'static/boosters/' + String(boosters_c[i].type) + '.png';
        else str = 'static/boosters/' + String(boosters_menu[i - 30].type) + '.png';
        document.getElementById('icon' + String(i)).src = str;
    }
}
function run_boosters() {
    if (!blackhole_mode || boosters_tot_cnt == 0) return;
    booster_sec += 0.01;
    let delta_light = 0;
    if (booster_energy > 0.000001 && Math.floor(Math.random() * 100) >= boosters_list[boosters_order[booster_position]].percentage) {
        let crit = Math.floor(Math.random() * 100) <= boosters_list[boosters_order[booster_position]].level * 10;
        for (let i = 1; i <= crit + 1; i++) {
            switch (boosters_list[boosters_order[booster_position]].type) {
                case 1: {
                    delta_light += 0.01;
                    break;
                }
                case 2: {
                    delta_light += 0.1;
                    break;
                }
                case 3: {
                    delta_light += 0.01;
                    break;
                }
                case 4: {
                    booster_energy += 0.01 * 0.01 * (booster_tot_storage);
                    if (booster_energy > booster_tot_storage) booster_energy = booster_tot_storage;
                    break;
                }
                case 5: {
                    delta_light += 0.05;
                    break;
                }
                case 6: {
                    delta_light += 0.02;
                    break;
                }
                case 7: {
                    break;
                }
                case 8: {
                    break;
                }
                case 9: {
                    booster_energy -= 0.01 * booster_tot_storage;
                    delta_light += 0.60 * booster_tot_storage;
                    break;
                }
                case 10: {
                    delta_light += 0.04;
                    break;
                }
                case 11: {
                    delta_light += 0.4;
                    break;
                }
                case 13: {
                    break;
                }
                case 14: {
                    break;
                }
                case 15: {
                    break;
                }
                case 16: {
                    break;
                }
                case 17: {
                    break;
                }
                case 18: {
                    break;
                }
            }
        }
    }
    let mins = Math.min(delta_light, time_resistance);
    delta_light -= mins, time_resistance -= mins;
    light_speed_blackhole += delta_light;
    let delta_energy = 0;
    if (!(booster_position >= 2 && boosters_list[boosters_order[booster_position - 1]].type == 13 && Math.floor(Math.random() * 100) >= boosters_list[boosters_order[booster_position - 1]].percentage))//recycle
        delta_energy -= boosters_cost[boosters_list[boosters_order[booster_position]].type];
    else
        delta_energy += boosters_cost[boosters_list[boosters_order[booster_position]].type] * (0.01 * (boosters_list[boosters_order[booster_position - 1]].level - 1));
    for (let i = 1; i <= boosters_tot_cnt; i++) {
        if (boosters_list[i].type == 16) {
            delta_energy *= (0.91 - 0.01 * boosters_list[i].level);
        }
    }
    booster_energy += delta_energy;
    if (booster_energy < 0.000001) booster_energy = 0;
    if (booster_sec > 0.9911) {
        booster_sec = 0;
        if (booster_energy > 0.000001)
            booster_position += 1;
        if (booster_position == boosters_tot_cnt + 1) {
            booster_position = 1;
            for (let i = 1; i <= boosters_tot_cnt; i++)
                boosters_order[i] = i;
            if (!relative_upgrade_unlocked[3][3]) {
                for (let i = boosters_tot_cnt; i > 1; i--) {
                    let j = Math.floor(Math.random() * i + 1);
                    [boosters_order[i], boosters_order[j]] = [boosters_order[j], boosters_order[i]];
                }
            }
        }
        print_icons();
    }
}
function calc_tot_storage() {
    booster_tot_storage = 0;
    let storage_mult = 1;
    for (let i = 1; i <= boosters_tot_cnt; i++) {
        booster_tot_storage += boosters_storage[boosters_list[i].type] * (0.95 + 0.05 * boosters_list[i].level);
        if (boosters_list[i].type == 8) storage_mult += 0.2;
    }
    if (relative_upgrade_unlocked[1][1]) booster_tot_storage *= relative_formula(11);
    booster_tot_storage *= storage_mult;
}
function dilation_upgrade() {
    if (high_larger(dilated_time, relative_formula(-2))) {
        dilated_time = high_sub(dilated_time, relative_formula(-2));
        dilation_level += 1;
    }
}
function display_booster(code, ato = 0) {
    if (mau_choice != 0 && swap_mode && ato == 0) {
        swap_booster(code);
        mau_choice = 0;
        print_icons();
    } else {
        if (ato) ato_choice = code;
        else mau_choice = code;
    }
    for (let i = 1; i <= boosters_max_cnt; i++) {
        if (mau_choice == i) {
            if (blackhole_mode)
                document.getElementById('booster' + String(i)).style.boxShadow = '0px 0px 30px #ffff00';
            else
                document.getElementById('booster' + String(i)).style.boxShadow = '0px 0px 40px #004000';
        } else if (ato_choice == i && blackhole_mode) {
            if (booster_energy < 0.000001)
                document.getElementById('booster' + String(i)).style.boxShadow = '0px 0px 30px #ff0000';
            else
                document.getElementById('booster' + String(i)).style.boxShadow = '0px 0px 30px #00ff00';
        } else
            document.getElementById('booster' + String(i)).style.boxShadow = '';
    }
    if (mau_choice != 0) code = mau_choice, document.getElementById('boosterintro1').innerHTML = '选中: ';
    else if (blackhole_mode) {
        code = ato_choice;
        if (booster_energy > 0.000001)
            document.getElementById('boosterintro1').innerHTML = '运行: ';
        else
            document.getElementById('boosterintro1').innerHTML = '截止: ';
    }
    else code = 0, document.getElementById('boosterintro1').innerHTML = '';
    document.getElementById('boosterintro1').innerHTML += boosters_name[boosters_c[code].type];
    document.getElementById('boosterintro2').innerHTML = boosters_c[code].level;
    document.getElementById('boosterintro3').innerHTML = boosters_c[code].percentage + '%';
    document.getElementById('boosterintro4').innerHTML = boosters_effect[boosters_c[code].type];
    document.getElementById('boosterintro5').innerHTML = sci_num(100 * boosters_cost[boosters_c[code].type]);
    document.getElementById('boosterintro6').innerHTML = sci_num(boosters_storage[boosters_c[code].type]);
}
function swap_booster(code) {
    if (boosters_list[mau_choice].type == 0 || boosters_list[code].type == 0) return;
    [boosters_list[mau_choice], boosters_list[code]] = [boosters_list[code], boosters_list[mau_choice]];
}
function remove_booster() {
    if (neutron_star < 1 || mau_choice == 0 || mau_choice > boosters_tot_cnt) return;
    swap_booster(boosters_tot_cnt);
    boosters_list[boosters_tot_cnt] = new Bst(0, 0, 0);
    boosters_tot_cnt -= 1;
    neutron_star -= 1;
    booster_position = 1;
    print_icons();
    if (neutron_star == 0) document.getElementById('b_remove').style.display = 'none';
}
function relative_upgradable(x, y) {
    let minp = 100, maxl = 0;
    for (let i = 1; i <= boosters_tot_cnt; i++) {
        if (boosters_list[i].type == 1) continue;
        if (minp > boosters_list[i].percentage) minp = boosters_list[i].percentage;
        if (maxl < boosters_list[i].level) maxl = boosters_list[i].level;
    }
    if (statistics[3] <= 18 && stellar_charge.low_get() >= 9e307) relative24_unlocked = 1;
    document.getElementById('b_relativeup' + String(x) + String(y) + '_req').style.color = '#ff0000';
    if (x == 1 && y == 1 && achievements_level < 170) return false;
    if (x == 1 && y == 2 && stellar_charge.low_get() < 1e180) return false;
    if (x == 1 && y == 3 && boosters_tot_cnt < 10) return false;
    if (x == 1 && y == 4 && (!blackhole_mode || velocity.low_get() < 2.00e3)) return false;
    if (x == 2 && y == 1 && star_point < 60) return false;
    if (x == 2 && y == 2 && !relative24_unlocked) return false;
    if (x == 2 && y == 3 && minp > 13) return false;
    if (x == 2 && y == 4 && maxl < 2) return false;
    if (x == 3 && y == 1 && (stars_upgrade_unlocked[1] || velocity.low_get() < 3.00e6)) return false;
    if (x == 3 && y == 2 && time_mult.low_get() < 1e80) return false;
    if (x == 3 && y == 3 && (!blackhole_mode || booster_energy / booster_tot_storage < 0.95 || velocity.low_get() < 3.00e4)) return false;
    if (x == 3 && y == 4 && maxl < 9) return false;
    document.getElementById('b_relativeup' + String(x) + String(y) + '_req').style.color = '';
    if (dilated_time.low_get() < relative_upgrade_cost[x][y]) return false;
    if (relative_upgrade_unlocked[x][y] == 1) return false;
    return true;
}
function relative_upgrade(x, y) {
    if (relative_upgradable(x, y)) {
        dilated_time = low_sub(dilated_time, relative_upgrade_cost[x][y]);
        relative_upgrade_unlocked[x][y] = 1;
    }
}
function relative_formula(code) {//0--矩阵等级公式 -1--矩阵膨胀时间公式 999--时间倍率公式 -2--收敛等级提升公式 -3--视界生产膨胀时间公式
    let dv = 3.00e6;
    if (code == -3) {
        let res = low_mul(low_low_pow(5, velocity.low_get() / 340.00), 0.2);
        if (relative_upgrade_unlocked[3][1]) res = low_mul(res, relative_formula(31));
        return res;
    } else if (code == -2) {
        return high_mul(low_mul(low_low_pow(Math.E, dilation_level * 2), 0.01), dilation_level >= 357 ? new Float(1.80, 308) : new Float(1, 0));
    } else if (code == -1) {
        return 0.25 * Math.pow(2, statistics[4] / 3e6);
    } else if (code == 0) {
        for (let i = 1; ; i++) {
            if (statistics[4] < dv * i * i) {
                if (i - 1 > dimension_level) dimension_level = i - 1;
                return dimension_level;
            }
        }
    } else if (code == 999) {
        if (dilated_time.low_get() < 0.01) return new Float(1, 0);
        let res = low_mul(low_low_pow(Math.E, dilation_level), high_log10(dilated_time) + 3);
        if (dream_mode) res = low_pow(res, 0.1 * dream_val);
        if (dream_completed) res = low_pow(res, dream_val);
        return res;
    } else if (code == 11) {
        return 2;
    } else if (code == 12) {
        if (dilation_mult.low_get() <= 10) return new Float(1, 0);
        return low_low_pow(high_log10(dilation_mult), 2);
    } else if (code == 22) {
        let relative22_power = 1;
        for (let i = 1; i <= boosters_tot_cnt; i++) {
            if (boosters_list[i].type == 18) {
                relative22_power += (0.15 + 0.005 * boosters_list[i].level) * (1 - boosters_list[i].percentage / 100.00);
            }
        }
        if (high_largere(hard_limit, stellar_charge)) return 1;
        if (relative_upgrade_unlocked[4][2]) return Math.pow(0.13 * relative22_power, high_log10(stellar_charge) / high_log10(hard_limit) - 1);
        return Math.pow(0.1 * relative22_power, high_log10(stellar_charge) / high_log10(hard_limit) - 1);
    } else if (code == 23) {
        return 10 * Math.pow(0.99, valid_operation);
    } else if (code == 31) {
        return Math.pow(star_point, 2.5) + 1;
    } else if (code == 32) {
        if (dilation_mult.low_get() <= 10) return new Float(1, 0);
        return low_low_pow(high_log10(dilation_mult), 2);
    } else if (code == 34) {
        return (1 + destinies_cnt);
    } else if (code == 43) {
        if (dilated_time.low_get() <= 1e240) return 0.01;
        return low_pow(low_div(dilated_time, 1e240), 0.025).low_get() / 100;
    }
}
