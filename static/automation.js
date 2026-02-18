function print_automation() {
    let txt = ['禁', '启'];
    if (mach_upgrade_unlocked[1][4] == 1) automation_unlocked[1] = 1;
    if (mach_upgrade_unlocked[3][4] == 1) automation_unlocked[2] = 1;
    if (mach_upgrade_unlocked[5][4] == 1) automation_unlocked[3] = 1;
    if (mach_upgrade_unlocked[7][4] == 1) automation_unlocked[4] = 1;
    if (mach_broken) automation_unlocked[5] = 1;
    if (stars_upgrade_unlocked[1] == 1) automation_unlocked[6] = 1;
    if (star_challenges_level[1] >= 4) automation_unlocked[7] = 1;
    if (star_challenges_level[1] >= 5) automation_unlocked[8] = 1;
    if (current_page != 'menu2') return;
    for (let i = 1; i <= automation_category_cnt; i++) {
        if (automation_unlocked[i])
            document.getElementById('b_au' + String(i) + '_val').innerHTML = txt[automation_activated[i]];
    }
    if (automator_running)
        document.getElementById('b_at1').style.backgroundColor = '#00aa00';
    else
        document.getElementById('b_at1').style.backgroundColor = '';
    if (automator_loop)
        document.getElementById('b_at3').style.backgroundColor = '#00aa00';
    else
        document.getElementById('b_at3').style.backgroundColor = '';
    if (automator_autostart)
        document.getElementById('b_at4').style.backgroundColor = '#00aa00';
    else
        document.getElementById('b_at4').style.backgroundColor = '';
}
function switch_automation(x) {
    automation_activated[x] = 1 - automation_activated[x];
}