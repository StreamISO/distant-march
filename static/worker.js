function run_game() {
    // setTimeout(run_game, tick_delay);//base:10
    tick_m = tick_delay / 1000;
    statistics[3] += 1, statistics[10] += 1, statistics[11] += 1;
    if (dream_mode) {
        if (broken_heart.low_get() < 10) light_speed_reality = 1314575.00;
        else light_speed_reality = 1314575.00 + Math.pow(1.25, get_bh());
        dream_val = 0.53 + Math.log(light_speed_blackhole / 340) * 0.01;
    } else light_speed_reality = 300015001.125, dream_val = 0.53;
    if (dream_completed) {
        dream_time += 1;
        if (!dream_mode)
            dream_val = 1 + 0.00001 * dream_time;
    }
    if ((current_challenge == 1 || current_challenge == 6) && challenges_01_tick < challenges_01_full_tick) challenges_01_tick += 1;
    if (velocity.low_get() > 10 && stars_upgrade_unlocked[1]) {
        let bnsc = new Float(high_log10(velocity), 0);
        bnsc = low_pow(bnsc, 0.01);
        if (stars_upgrade_unlocked[28]) bnsc = low_pow(bnsc, stars_formula(28));
        if (stars_upgrade_unlocked[30]) bnsc = low_pow(bnsc, stars_formula(30));
        if (relative_upgrade_unlocked[1][2]) bnsc = high_pow(bnsc, relative_formula(12));
        if (relative_upgrade_unlocked[2][2]) bnsc = low_pow(bnsc, relative_formula(22));
        if (boosters_list[boosters_order[booster_position]].type == 7) {
            bnsc = low_pow(bnsc, 5 * Math.pow(2, boosters_list[boosters_order[booster_position]].level * (1 - boosters_list[boosters_order[booster_position]].percentage / 100.00)));
        }
        hard_limit = low_add(mach_point, 10);
        if (stars_upgrade_unlocked[28]) hard_limit = low_pow(hard_limit, 1.25);
        if (stars_upgrade_unlocked[29]) hard_limit = low_pow(hard_limit, 1.3);
        if (stars_upgrade_unlocked[30]) hard_limit = low_pow(hard_limit, 1.35);
        if (high_larger(bnsc, hard_limit)) bnsc = hard_limit;
        stellar_charge = high_mul(stellar_charge, bnsc);
        if (high_larger(stellar_charge, hard_limit) && !relative_upgrade_unlocked[2][2]) stellar_charge = hard_limit;
    }
    calc_tot_storage();
    if (blackhole_mode && high_larger(stellar_charge, bm_stellar_charge)) bm_stellar_charge = stellar_charge;
    let booster_vel = 1 + relative_upgrade_unlocked[2][4], booster_vel_mult = 1;
    if (relative_upgrade_unlocked[3][4]) booster_vel *= relative_formula(34);
    if (blackhole_mode && light_speed_blackhole > 7.92e3 && boosters_list[boosters_order[booster_position]].type != 6) {
        let delta_resistance = 0.007 * Math.pow(1.3, light_speed_blackhole / 7.92e3) * Math.pow(0.5, high_log2(bm_stellar_charge) / 1024);//*10 debug
        for (let i = 1; i <= boosters_tot_cnt; i++) {
            if (boosters_list[i].type == 15) {
                delta_resistance *= (0.508 - 0.008 * boosters_list[i].level) * (1 + boosters_list[i].percentage / 100.00);
            } else if (boosters_list[i].type == 17) {
                booster_vel_mult += (0.1 + 0.005 * boosters_list[i].level) * (1 - boosters_list[i].percentage / 100.00);
            }
        }
        time_resistance += delta_resistance;
        if (time_resistance > max_resistance) max_resistance = time_resistance;
    }
    booster_vel *= booster_vel_mult;
    if (dream_mode) {
        if (statistics[1] <= 1.00e5) booster_vel = 1;
        else booster_vel = 1 + Math.log2(statistics[1] / 1.00e5) * 3;
    }
    for (let i = 1; i <= booster_vel; i++) {//*10 debug
        run_boosters();
    }
    let p_vel = velocity;
    calc_velocity();
    if (velocity.low_get() < 0) velocity.to(0.00, 0);
    if (velocity.low_get() >= 340.00 && !statistics[6]) {
        velocity.to(3.40, 2);
    } else if (dream_mode && velocity.low_get() >= 1314520.00) {
        velocity.to(1.31452, 6);
    }
    if (velocity.low_get() > statistics[1]) statistics[1] = velocity.low_get();
    if (velocity.low_get() > statistics[4]) statistics[4] = velocity.low_get();
    if (velocity.low_get() > 3.00e8 && !ending_triggered) {
        document.getElementById('fullscreen').style.display = '';
        full_f = 1314;
        ending_triggered = 1;
        ending_triggering = 1;
    }
    calc_dist_mult();
    // dist_mult = new Float(1, 900);
    calc_time_mult();
    if (relative_upgrade_unlocked[4][3] && !dream_mode) {
        stored_sp += relative_formula(43);
        if (stored_sp >= 1) {
            let dt = Math.floor(stored_sp);
            stored_sp -= dt, star_point += dt, cur_star_point += dt;
        }
    }
    if (blackhole_mode && velocity.low_get() > 340.00) {
        dilated_time = high_add(dilated_time, relative_formula(-3));
    }
    delta_distance = high_mul(low_mul(high_add(p_vel, velocity), 0.5 * tick_m * (1 + 999999 * god_mode)), high_mul(dist_mult, dilation_mult));//debug
    distance = high_add(distance, delta_distance);
    statistics[2] += delta_distance.low_get(), statistics[5] += delta_distance.low_get();
    if (statistics[2] >= 1e300) statistics[2] = 1e300;
    if (statistics[5] >= 1e300) statistics[5] = 1e300;
}
function run_automation() {
    automation_delay = 1000 * mach_upgrade_formula(4, 4);
    automation_charge += 10;
    automation_8_charge += 0.01;
    if (automation_8_charge > automation_8_trigger) automation_8_charge = automation_8_trigger;
    if (automation_charge < automation_delay) return;
    automation_charge = 0;
    // setTimeout(run_automation, automation_delay);//base:1000
    for (let i = 1; i <= automation_category_cnt; i++) {
        if (automation_activated[i] && automation_unlocked[i]) {
            if (i == 1) {
                if (mach_upgrade_unlocked[2][4])
                    buy_substance(1, 1);
                else if (mach_upgrade_unlocked[1][4])
                    buy_substance(1, 0);
            } else if (i == 2) {
                if (mach_upgrade_unlocked[3][4])
                    buy_substance(2, 1);
            } else if (i == 3) {
                if (mach_upgrade_unlocked[6][4])
                    buy_substance(3, 1);
                else if (mach_upgrade_unlocked[5][4])
                    buy_substance(3, 0);
            } else if (i == 4) {
                if (mach_upgrade_unlocked[7][4])
                    buy_substance(4, 0);
            } else if (i == 5) {
                if (mach_broken && velocity.low_get() > 339.99 && break_mach_upgrade_formula(0, 0).low_get() >= automation_5_trigger.low_get()) {
                    if (velocity.low_get() >= 7.92e3) {
                        fall_reset();
                    } else {
                        mach_reset();
                    }
                }
            } else if (i == 6) {
                if (stars_upgrade_unlocked[1])
                    buy_substance(5, 0);
            } else if (i == 7) {
                if (mach_point.low_get() >= mach_upgrade_unlocked[4][2] * 10 && star_challenges_level[1] >= 4) {
                    mach_upgrade(4, 2);
                }
            } else if (i == 8) {
                if (automation_8_charge >= automation_8_trigger) {
                    automation_8_charge = 0;
                    if (velocity.low_get() >= 7.92e3) {
                        fall_reset();
                    } else {
                        mach_reset();
                    }
                }
            }
        }
    }
}
function run_automator() {
    if (!automator_running) return;
    let do_matrix = 0;
    let n = automator_code.length;
    let word = '';
    let operword = '';
    let opercnt = 0;
    let i;
    for (i = automator_last; i < n; i++) {
        let c = automator_code[i];
        if ('A' <= c && c <= 'Z') space = 0, word += c.toLowerCase();
        else if (('0' <= c && c <= '9') || ('a' <= c && c <= 'z') || c == '_' || c == '.') space = 0, word += c;
        else if (c == ';' || !space) {
            space = 1;
            automator_codelist[opercnt] = word;
            word = '';
            opercnt += 1;
            if (';' == c) {//operate
                // for (let p = 0; p < opercnt; p++)console.log(automator_codelist[p]);
                let success = 0;
                operword = automator_codelist[0];
                switch (operword) {
                    case 'reset': {
                        let thres = parseFloat(automator_codelist[1]);
                        let nowait = 0;
                        for (let i = 2; i < opercnt; i++) {
                            if (automator_codelist[i] == 'nowait') nowait = 1;
                        }
                        let cando = velocity.low_get() >= 340.00 && break_mach_upgrade_formula(0, 0).low_get() >= thres;
                        if (!cando) {
                            success = nowait;
                            break;
                        }
                        success = 1;
                        if (velocity.low_get() >= 7.92e3) {
                            fall_reset();
                        } else if (velocity.low_get() >= 340.00) {
                            mach_reset();
                        }
                        break;
                    }
                    case 'star': {
                        let thres = parseFloat(automator_codelist[1]);
                        let nowait = 0, respec = 0;
                        for (let i = 2; i < opercnt; i++) {
                            if (automator_codelist[i] == 'nowait') nowait = 1;
                            else if (automator_codelist[i] == 'respec') respec = 1;
                        }
                        let cando = stars_formula(0) >= thres;
                        if (!cando) {
                            success = nowait;
                            break;
                        }
                        success = 1;
                        to_respec = respec;
                        stars_reset();
                        break;
                    }
                    case 'purchase': {
                        let cando = 1;
                        let nowait = 0;
                        for (let i = 1 + nowait; i < opercnt; i++) {
                            if (automator_codelist[1] == 'nowait') {
                                nowait = 1;
                                continue;
                            }
                            let buy = stars_upgrade_dic[automator_codelist[i]];
                            if (!stars_upgradable(buy) && !stars_upgrade_unlocked[buy]) {
                                cando = 0;
                                break;
                            } else stars_upgrade(buy);
                        }
                        if (!cando) {
                            success = nowait;
                            break;
                        }
                        success = 1;
                        break;
                    }
                    case 'restriction': {
                        for (let i = 1; i <= 4; i++) {
                            if ((automator_codelist[i] == 'on' || automator_codelist[i] == '1') && !restriction_selected[i]) restriction_selected[i] = 1, restriction_selected_cnt += 1;
                            else if ((automator_codelist[i] == 'off' || automator_codelist[i] == '0') && restriction_selected[i]) restriction_selected[i] = 0, restriction_selected_cnt -= 1;
                        }
                        success = 1;
                        break;
                    }
                    case 'challenge': {
                        let cando = 1;
                        let nowait = 0;
                        let which = parseInt(automator_codelist[1]);
                        if (which < 1 || which > 5) which = 0;
                        for (let i = 2; i < opercnt; i++) {
                            if (automator_codelist[i] == 'nowait') nowait = 1;
                            else if (automator_codelist[i] == 'star') which += 5;
                        }
                        if (current_challenge == which || finish) cando = 1;
                        else cando = switch_challenges(which);
                        if (!cando) {
                            success = nowait;
                            break;
                        }
                        finish = 1, cando = 0;
                        if (current_challenge == 0) {
                            finish = 0;
                            cando = 1;
                        }
                        if (!cando) {
                            success = nowait;
                            break;
                        }
                        success = 1;
                        break;
                    }
                    case 'matrix': {
                        let thres = parseFloat(automator_codelist[1]);
                        let cando = dimension_level >= thres;
                        if (!cando) {
                            break;
                        }
                        success = 1;
                        do_matrix = 1;
                        break;
                    }
                    case 'auto': {
                        let command = automator_codelist[1];
                        let on = 1, val = -1;
                        for (let i = 2; i < opercnt; i++) {
                            if (automator_codelist[i] == 'on') on = 1;
                            else if (automator_codelist[i] == 'off') on = 0;
                            else val = parseFloat(automator_codelist[i]);
                        }
                        switch (command) {
                            case 'booster': {
                                automation_activated[1] = on;
                                break;
                            }
                            case 'counter': {
                                automation_activated[2] = on;
                                break;
                            }
                            case 'turbo': {
                                automation_activated[3] = on;
                                break;
                            }
                            case 'flow': {
                                automation_activated[4] = on;
                                break;
                            }
                            case 'reset': {
                                automation_activated[5] = on;
                                if (val != -1) automation_5_trigger = val;
                                break;
                            }
                            case 'stellar': {
                                automation_activated[6] = on;
                                break;
                            }
                            case 'mach42': {
                                automation_activated[7] = on;
                                break;
                            }
                            case 'timer': {
                                automation_activated[8] = on;
                                if (val != -1) automation_8_trigger = val;
                                break;
                            }
                        }
                        success = 1;
                        break;
                    }
                    case 'log': {
                        let output = '';
                        for (let i = 1; i < opercnt; i++) {
                            output += automator_codelist[i] + ' ';
                        }
                        success = 1;
                        console.log(output);
                        break;
                    }
                }
                for (let j = 0; j < opercnt; j++)automator_codelist[j] = '';
                opercnt = 0;
                if (success)
                    automator_last = i + 1;
                break;
            }
        }
    }
    if (i == n) {//end of text
        automator_running = automator_loop;
        automator_last = 0;
    }
    if (do_matrix) matrix_reset();
}
function run_rainbow() {
    if (!stars_upgrade_unlocked[34] || current_challenge == 8) return;
    rainbow_charge += 10;
    if ((rainbow_charge < 250 || (rainbow_charge < 1000 && !stars_upgrade_unlocked[35])) || velocity.low_get() < 341) return;
    rainbow_charge = 0;
    if (velocity.low_get() < 7.92e3) mach_reset(1);
    else fall_reset(1);
}
//Web Worker
class PreciseBackgroundTimer {
    constructor(interval) {
        this.interval = interval;
        this.expected = 0;
        this.timeoutId = null;
        this.count = 0;
        this.isRunning = false;
        this.worker = this.createWorker();
    }
    createWorker() {
        const workerCode = `
        let interval = 10;
        let driftHistory = [];
        let expected = Date.now();
        
        function tick() {
          const now = Date.now();
          const drift = now - expected;
          driftHistory.push(drift);
          if (driftHistory.length > 10) driftHistory.shift();
          const avgDrift = driftHistory.reduce((a, b) => a + b) / driftHistory.length;
          self.postMessage({
            type: 'tick',
            timestamp: now,
            drift: avgDrift
          });
          expected += interval;
          setTimeout(tick, Math.max(0, interval - avgDrift));
        }
        self.onmessage = (e) => {
          if (e.data === 'start') {
            expected = Date.now();
            tick();
          }
        };
      `;
        const blob = new Blob([workerCode]);
        return new Worker(URL.createObjectURL(blob));
    }
    start(callback) {
        this.isRunning = true;
        this.count = 0;
        this.worker.onmessage = (e) => {
            if (e.data.type === 'tick' && this.isRunning) {
                this.count++;
                callback({
                    count: this.count,
                    timestamp: e.data.timestamp,
                    drift: e.data.drift
                });
            }
        };
        this.worker.postMessage('start');
    }
    stop() {
        this.isRunning = false;
        this.worker.terminate();
    }
}
function handle_keydown_event(event) {
    const key = event.key;
    // event.preventDefault();
    if (key == 'a') {
        god_mode = 1;
    }
}
function handle_keyup_event(event) {
    // event.preventDefault();
    const key = event.key;
    if (key == 'a') {
        god_mode = 0;
    }
}
//RUN
display_booster(0);
// document.addEventListener('keydown', handle_keydown_event);
// document.addEventListener('keyup', handle_keyup_event);
const circle = [0, 0, 0, 0];
for (let i = 0; i < 3; i++) {
    circle[i] = document.createElement('div');
    circle[i].style.display = 'none';
    document.body.appendChild(circle[i]);
}
const preciseTimera = new PreciseBackgroundTimer(tick_delay);
const preciseTimerb = new PreciseBackgroundTimer(tick_delay);
const preciseTimerc = new PreciseBackgroundTimer(tick_delay);
const preciseTimerd = new PreciseBackgroundTimer(tick_delay);
const preciseTimere = new PreciseBackgroundTimer(tick_delay);
const preciseTimerf = new PreciseBackgroundTimer(tick_delay);
const preciseTimerg = new PreciseBackgroundTimer(tick_delay);
document.body.style.zoom = '80%';
preciseTimera.start((data) => {
    run_game();
});
preciseTimerb.start((data) => {
    run_automator();
});
preciseTimerc.start((data) => {
    run_automation();
});
preciseTimerd.start((data) => {
    run_rainbow();
});
preciseTimere.start((data) => {
    if (blackhole_mode) {
        document.getElementById('b_reset2').style.display = 'none';
        document.getElementById('b_reset1').style.display = 'none';
        document.getElementById('t_reset1').style.display = 'none';
        if (velocity.low_get() > 340.00) {
            document.getElementById('t_reset1').style.display = '';
        }
    } else {
        if (velocity.low_get() > 339.99 && ((statistics[6] == 0 && !star_point && !dilated_time.low_get() > 0) || mach_broken)) {
            document.getElementById('b_reset1').style.display = '';
            document.getElementById('t_reset1').style.display = '';
        } else if (velocity.low_get() > 339.99 && !mach_broken) {
            mach_reset();
        } else if (velocity.low_get() <= 339.99) {
            document.getElementById('b_reset1').style.display = 'none';
            document.getElementById('t_reset1').style.display = 'none';
        }
        if (velocity.low_get() >= 7.92e3) {
            document.getElementById('b_reset1').style.display = 'none';
            document.getElementById('b_reset2').style.display = '';
        } else if (velocity.low_get() > 339.99) {
            document.getElementById('b_reset2').style.display = 'none';
            document.getElementById('b_reset1').style.display = '';
        } else {
            document.getElementById('b_reset2').style.display = 'none';
            document.getElementById('b_reset1').style.display = 'none';
        }
    }
});
preciseTimerf.start((data) => {
    full_animation();
    init_cost();
    disable_buttons();
    complete_challenges();
});
preciseTimerg.start((data) => {
    print_global();
    print_substance();
    print_target();
    print_automation();
    print_mach();
    print_break_mach();
    print_stars();
    print_relative();
    print_challenges();
    print_statistics();
    print_achievements();
});