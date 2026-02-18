function change_visibility(str, flag) {
    if (flag) document.getElementById(str).style.display = '';
    else document.getElementById(str).style.display = 'none';
}
function print_intro() {
    setTimeout(print_intro, 10);
    change_visibility('intro_2_1_flow', mach_upgrade_unlocked[6][2] == 1);
    change_visibility('intro_2_1_stellar', stars_upgrade_unlocked[1]);
    change_visibility('intro_3_link', statistics[1] > 339.99);
    change_visibility('intro_3_title', statistics[1] > 339.99);
    change_visibility('intro_3_1', statistics[1] > 339.99);
    change_visibility('intro_4_link', mach_upgrade_unlocked[1][4]);
    change_visibility('intro_4_title', mach_upgrade_unlocked[1][4]);
    change_visibility('intro_4_1', mach_upgrade_unlocked[1][4]);
    change_visibility('intro_4_1_autoreset', automation_unlocked[5]);
    change_visibility('intro_4_1_automach42', automation_unlocked[7]);
    change_visibility('intro_4_1_timerreset', automation_unlocked[8]);
    change_visibility('intro_5_link', statistics[7] <= 100 || break_mach_upgrade_unlocked[1][1]);
    change_visibility('intro_5_title', statistics[7] <= 100 || break_mach_upgrade_unlocked[1][1]);
    change_visibility('intro_5_1', statistics[7] <= 100 || break_mach_upgrade_unlocked[1][1]);
    change_visibility('intro_5_1_fallreset', statistics[1] >= 7.92e3);
    change_visibility('intro_6_link', mach_upgrade_unlocked[5][1] == 1);
    change_visibility('intro_6_title', mach_upgrade_unlocked[5][1] == 1);
    change_visibility('intro_6_1', mach_upgrade_unlocked[5][1] == 1);
    change_visibility('intro_6_1_starre', star_challenges_unlocked[1] == 1);
    change_visibility('intro_7_link', challenges_unlocked[1] == 1);
    change_visibility('intro_7_title', challenges_unlocked[1] == 1);
    change_visibility('intro_7_1', challenges_unlocked[1] == 1);
    change_visibility('intro_7_1_starch', star_challenges_unlocked[1] == 1);
    change_visibility('intro_8_link', statistics[1] >= 1.00e5);
    change_visibility('intro_8_title', statistics[1] >= 1.00e5);
    change_visibility('intro_8_1', statistics[1] >= 1.00e5);
    change_visibility('intro_9_link', statistics[1] >= 3.00e6 || dilated_time.low_get() > 0.001);
    change_visibility('intro_9_title', statistics[1] >= 3.00e6 || dilated_time.low_get() > 0.001);
    change_visibility('intro_9_1', statistics[1] >= 3.00e6 || dilated_time.low_get() > 0.001);
    change_visibility('intro_10_link', statistics[1] >= 3.00e6 || dilated_time.low_get() > 0.001);
    change_visibility('intro_10_title', statistics[1] >= 3.00e6 || dilated_time.low_get() > 0.001);
    change_visibility('intro_10_1', statistics[1] >= 3.00e6 || dilated_time.low_get() > 0.001);
    change_visibility('intro_11_link', statistics[1] >= 3.00e6 || dilated_time.low_get() > 0.001);
    change_visibility('intro_11_title', statistics[1] >= 3.00e6 || dilated_time.low_get() > 0.001);
    change_visibility('intro_11_1', statistics[1] >= 3.00e6 || dilated_time.low_get() > 0.001);
    change_visibility('intro_12_link', relative_upgrade_unlocked[1][4]);
    change_visibility('intro_12_title', relative_upgrade_unlocked[1][4]);
    change_visibility('intro_12_1', relative_upgrade_unlocked[1][4]);
}
print_intro();