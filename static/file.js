function import_local(str = 'fileInput') {
    const fileInput = document.getElementById(str);
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            let cur = 0;
            let ctn = e.target.result;
            //read content
            let n = ctn.length;
            let a = '';
            function iter(category) {//1--int 2--float 3--string to end
                if (category == 3) {
                    while (cur < n) a += ctn[cur], cur++;
                    return a;
                }
                while (ctn[cur] != ' ' && ctn[cur] != '\n') a += ctn[cur], cur++;
                if (category == 1) {
                    res = parseInt(a);
                } else if (category == 2) {
                    res = parseFloat(a);
                }
                cur++, a = '';
                return res;
            }
            //Global
            velocity.to(iter(2), iter(1));
            distance.to(iter(2), iter(1));
            stellar_charge.to(iter(2), iter(1));
            //Substance
            for (let i = 1; i <= substance_category_cnt; i++) {
                substance_cnt[i] = iter(1);
            }
            //Automation
            automation_5_trigger.to(iter(2), iter(1));
            automation_8_trigger = iter(2);
            for (let i = 1; i <= automation_category_cnt; i++) {
                automation_unlocked[i] = iter(1);
                automation_activated[i] = iter(1);
            }
            automator_running = iter(1), automator_last = iter(1), automator_loop = iter(1), automator_autostart = iter(1), space = iter(1), finish = iter(1);
            //Mach
            mach_point.to(iter(2), iter(1));
            for (let i = 1; i <= mach_col; i++) {
                mach_upgrade_disabled[i] = iter(1);
            }
            for (let i = 1; i <= mach_row; i++) {
                for (let j = 1; j <= mach_col; j++) {
                    if (i == 4) mach_upgrade_unlocked[i][j] = iter(2);
                    else mach_upgrade_unlocked[i][j] = iter(1);
                }
            }
            //Break_Mach
            mach_broken = iter(1);
            for (let i = 1; i <= break_mach_row; i++) {
                for (let j = 1; j <= break_mach_col; j++) {
                    break_mach_upgrade_unlocked[i][j] = iter(1);
                }
            }
            broken_heart.to(iter(2), iter(1));
            //Stars
            star_point = iter(1), cur_star_point = iter(1), to_respec = iter(1);
            for (let i = 1; i <= stars_upgrade_category_cnt; i++) {
                stars_upgrade_unlocked[i] = iter(1);
            }
            star_upgrade_17_max = iter(2);
            //Relative
            dilated_time.to(iter(2), iter(1));
            dilation_level = iter(1);
            blackhole_mode = iter(1);
            bm_stellar_charge.to(iter(2), iter(1));
            time_resistance = iter(2), max_resistance = iter(2);
            if (blackhole_mode == 1 && str == 'fileInput') {
                blackhole_mode = 0;
                switch_blackhole(1);
            }
            boosters_tot_cnt = iter(1);
            for (let i = 1; i <= boosters_max_cnt; i++) {
                boosters_list[i].type = iter(1), boosters_list[i].level = iter(1), boosters_list[i].percentage = iter(1);
            }
            for (let i = 1; i <= boosters_max_cnt; i++) {
                boosters_order[i] = iter(1);
            }
            neutron_star = iter(1);
            valid_operation = iter(1);
            booster_energy = iter(2), booster_position = iter(1), booster_sec = iter(2);
            light_speed_blackhole = iter(2);
            booster_selected = iter(1), booster_spawned = iter(1);
            for (let i = 1; i <= 3; i++) {
                boosters_menu[i].type = iter(1), boosters_menu[i].level = iter(1), boosters_menu[i].percentage = iter(1);
            }
            for (let i = 1; i <= relative_row; i++) {
                for (let j = 1; j <= relative_col; j++) {
                    relative_upgrade_unlocked[i][j] = iter(1);
                }
            }
            dream_mode = iter(1), dream_completed = iter(1), dream_time = iter(1);
            ending_triggered = iter(1);
            //Challenges
            restriction_selected_cnt = iter(1), restriction_activated_cnt = iter(1);
            for (let i = 1; i <= restriction_category_cnt; i++) {
                restriction_selected[i] = iter(1), restriction_activated[i] = iter(1);
            }
            current_challenge = iter(1);
            for (let i = 1; i <= challenges_category_cnt; i++) {
                challenges_unlocked[i] = iter(1), challenges_level[i] = iter(1);
            }
            for (let i = 1; i <= star_challenges_category_cnt; i++) {
                star_challenges_unlocked[i] = iter(1), star_challenges_level[i] = iter(1);
            }
            star_challenge_2_dist_mult = iter(2), star_challenge_3_reset_cnt = iter(1);
            //Statistics
            for (let i = 1; i <= statistics_category_cnt; i++) {
                statistics[i] = iter(2);
            }
            //Achievements
            achievements_cnt = iter(1), achievements_level = iter(1);
            for (let i = 1; i <= achievements_category_cnt; i++) {
                achievements_unlocked[i] = iter(1);
            }
            destinies_cnt = iter(1);
            for (let i = 1; i <= destinies_category_cnt; i++) {
                destinies_unlocked[i] = iter(1);
            }
            automator_code = iter(3);
            document.getElementById('automator_input').value = automator_code;
            //End
            if (str = 'fileInput') {
                init_cost();
            }
        };
        reader.readAsText(file);
        if (str == 'fileInput') {
            document.getElementById('menu2').style.display = 'none';
            document.getElementById('menu3').style.display = 'none';
            document.getElementById('menu4').style.display = 'none';
            document.getElementById('menu5').style.display = 'none';
            document.getElementById('menu6').style.display = 'none';
            document.getElementById('menu7').style.display = 'none';
        }
    } else {
        alert('请先选择一个文件!');
    }
}
function export_save() {
    let ctn = '';
    //Global
    ctn += velocity.a.toFixed(5) + ' ' + velocity.b + ' ' + distance.a.toFixed(5) + ' ' + distance.b + ' ' + stellar_charge.a.toFixed(5) + ' ' + stellar_charge.b + ' ';
    //Substance
    for (let i = 1; i <= substance_category_cnt; i++) {
        ctn += String(substance_cnt[i]) + ' ';
    }
    //Automation
    ctn += automation_5_trigger.a.toFixed(5) + ' ' + automation_5_trigger.b + ' ' + automation_8_trigger.toFixed(5) + ' ';
    for (let i = 1; i <= automation_category_cnt; i++) {
        ctn += String(automation_unlocked[i]) + ' ' + String(automation_activated[i]) + ' ';
    }
    ctn += String(automator_running) + ' ' + String(automator_last) + ' ' + String(automator_loop) + ' ' + String(automator_autostart) + ' ' + String(space) + ' ' + String(finish) + ' ';
    //Mach
    ctn += mach_point.a + ' ' + mach_point.b + ' ';
    for (let i = 1; i <= mach_col; i++) {
        ctn += String(mach_upgrade_disabled[i]) + ' ';
    }
    for (let i = 1; i <= mach_row; i++) {
        for (let j = 1; j <= mach_col; j++) {
            ctn += String(mach_upgrade_unlocked[i][j]) + ' ';
        }
    }
    //Break_Mach
    ctn += String(mach_broken) + ' ';
    for (let i = 1; i <= break_mach_row; i++) {
        for (let j = 1; j <= break_mach_col; j++) {
            ctn += String(break_mach_upgrade_unlocked[i][j]) + ' ';
        }
    }
    ctn += broken_heart.a + ' ' + broken_heart.b + ' ';
    //Stars
    ctn += String(star_point) + ' ' + String(cur_star_point) + ' ' + String(to_respec) + ' ';
    for (let i = 1; i <= stars_upgrade_category_cnt; i++) {
        ctn += String(stars_upgrade_unlocked[i]) + ' ';
    }
    ctn += String(star_upgrade_17_max) + ' ';
    //Relative
    ctn += dilated_time.a.toFixed(5) + ' ' + dilated_time.b + ' ' + String(dilation_level) + ' ';
    ctn += blackhole_mode + ' ';
    ctn += bm_stellar_charge.a.toFixed(5) + ' ' + bm_stellar_charge.b + ' ';
    ctn += time_resistance.toFixed(5) + ' ' + max_resistance.toFixed(5) + ' ';
    ctn += boosters_tot_cnt + ' ';
    for (let i = 1; i <= boosters_max_cnt; i++) {
        ctn += boosters_list[i].type + ' ' + boosters_list[i].level + ' ' + boosters_list[i].percentage + ' ';
    }
    for (let i = 1; i <= boosters_max_cnt; i++) {
        ctn += boosters_order[i] + ' ';
    }
    ctn += neutron_star + ' ';
    ctn += valid_operation + ' ';
    ctn += booster_energy.toFixed(5) + ' ' + booster_position + ' ' + booster_sec.toFixed(2) + ' ';
    ctn += light_speed_blackhole.toFixed(5) + ' ';
    ctn += booster_selected + ' ' + booster_spawned + ' ';
    for (let i = 1; i <= 3; i++) {
        ctn += boosters_menu[i].type + ' ' + boosters_menu[i].level + ' ' + boosters_menu[i].percentage + ' ';
    }
    for (let i = 1; i <= relative_row; i++) {
        for (let j = 1; j <= relative_col; j++) {
            ctn += String(relative_upgrade_unlocked[i][j]) + ' ';
        }
    }
    ctn += dream_mode + ' ' + dream_completed + ' ' + dream_time + ' ';
    ctn += ending_triggered + ' ';
    //Challenges
    ctn += String(restriction_selected_cnt) + ' ' + String(restriction_activated_cnt) + ' ';
    for (let i = 1; i <= restriction_category_cnt; i++) {
        ctn += String(restriction_selected[i]) + ' ' + String(restriction_activated[i]) + ' ';
    }
    ctn += String(current_challenge) + ' ';
    for (let i = 1; i <= challenges_category_cnt; i++) {
        ctn += String(challenges_unlocked[i]) + ' ' + String(challenges_level[i]) + ' ';
    }
    for (let i = 1; i <= star_challenges_category_cnt; i++) {
        ctn += String(star_challenges_unlocked[i]) + ' ' + String(star_challenges_level[i]) + ' ';
    }
    ctn += String(star_challenge_2_dist_mult) + ' ' + String(star_challenge_3_reset_cnt) + ' ';
    //Statistics
    for (let i = 1; i <= statistics_category_cnt; i++) {
        ctn += String(statistics[i].toFixed(5)) + ' ';
    }
    //Achievements
    ctn += String(achievements_cnt) + ' ' + String(achievements_level) + ' ';
    for (let i = 1; i <= achievements_category_cnt; i++) {
        ctn += String(achievements_unlocked[i]) + ' ';
    }
    ctn += String(destinies_cnt) + ' ';
    for (let i = 1; i <= destinies_category_cnt; i++) {
        ctn += String(destinies_unlocked[i]) + ' ';
    }
    //Automator Code
    ctn += automator_code;
    //End
    return ctn;
}
function export_local() {
    const downloadToFile = (content, filename, contentType) => {
        const a = document.createElement('a');
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = filename;
        a.click();
        URL.revokeObjectURL(a.href);
    };
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toFixed(0).padStart(2, '0');
    const day = date.getDate().toFixed(0).padStart(2, '0');
    const hour = date.getHours().toFixed(0).padStart(2, '0');
    const minute = date.getMinutes().toFixed(0).padStart(2, '0');
    downloadToFile(export_save(), `Distant March-${year}-${month}-${day}-${hour}-${minute}.txt`, 'text/plain');
}