class Float {
    constructor(x, y) {
        this.a = x;
        this.b = y;
    }
    to_sci() {
        if (this.a > -0.000001 && this.a < 0.000001) {
            this.b = 0;
        }
        // while (this.a > 0 && this.a < 1000.0 && this.b > 0) {
        //     this.b -= 1;
        //     this.a *= 10;
        // }
        // if (this.a >= 1000.0 || (this.a >= 10.0 && this.b >= 3) || (this.a >= 10.0 && fs)) {
        //     while (this.a > 9.99) {
        //         this.a /= 10.0;
        //         this.b += 1;
        //     }
        // }
        if (this.a > 10) {
            let np = Math.floor(Math.log10(this.a));
            this.b += np;
            this.a *= Math.pow(0.1, np);
        }
        if (this.a > 0 && this.a < 1) {
            let np = Math.floor(Math.log10(this.a));
            this.b += np;
            this.a *= Math.pow(0.1, np);
        }
    }
    to(x, y) {
        this.a = x;
        this.b = y;
        this.to_sci();
    }
    low_get() {
        if (this.b <= 307)
            return this.a * Math.pow(10, this.b);
        else
            return 1e308;
    }
    to_a() {
        if (this.b < 0)
            this.a *= Math.pow(0.1, -this.b);
        if (this.b > 0)
            this.a *= Math.pow(10, this.b);
        this.b = 0;
    }
}
function high_add(x, y) {
    if (x.b > y.b + 20) return x;
    else if (y.b > x.b + 20) return y;
    else {
        let z = new Float(x.a, x.b);
        z.a += y.a * Math.pow(10, y.b - x.b);
        z.to_sci();
        return z;
    }
}
function high_sub(x, y) {
    let z = new Float(-y.a, y.b);
    return high_add(x, z);
}
function high_mul(x, y) {
    let z = new Float(x.a, x.b);
    z.a *= y.a;
    z.b += y.b;
    z.to_sci();
    return z;
}
function high_div(x, y) {
    let z = new Float(y.a, y.b);
    z.a = 1 / z.a, z.b = -z.b;
    return high_mul(x, z);
}
function high_pow(x, y) {
    y.to_a();//9.5 -1, 1.81 0
    let z = new Float(0, 0);
    if (x.a == 0) return z;
    z.to(1, 0);
    if (y.a == 0 || x.a == 1) return z;
    x.to_sci();
    if (x.b < -20) return new Float(0, 0);
    if (x.b < 0) x.a *= Math.pow(0.1, -x.b), x.b = 0;
    let la = Math.log10(x.a) + x.b;
    let np = Math.floor(y.a * la);
    let bs = y.a - np / la;
    z.to(Math.pow(x.a, bs) * Math.pow(Math.pow(10, bs), x.b), np);
    z.to_sci();
    return z;
}
function high_log2(x) {
    let z = Math.log2(x.a) + x.b * Math.log2(10);
    return z;
}
function high_log(x) {
    let z = Math.log(x.a) + x.b * Math.log(10);
    return z;
}
function high_log10(x) {
    let z = Math.log10(x.a) + x.b * Math.log10(10);
    return z;
}
function low_add(x, y) {
    let z = new Float(y, 0);
    z.to_sci();
    return high_add(x, z);
}
function low_sub(x, y) {
    let z = new Float(y, 0);
    z.to_sci();
    return high_sub(x, z);
}
function low_mul(x, y) {
    let z = new Float(y, 0);
    z.to_sci();
    return high_mul(x, z);
}
function low_div(x, y) {
    let z = new Float(y, 0);
    z.to_sci();
    return high_div(x, z);
}
function low_pow(x, y) {
    let z = new Float(y, 0);
    return high_pow(x, z);
}
function low_low_pow(x, y) {
    let z = new Float(x, 0), zz = new Float(y, 0);
    z.to_sci();
    return high_pow(z, zz);
}
function high_larger(x, y) {
    let z = high_sub(x, y);
    return z.a > 0;
}
function high_largere(x, y) {
    let z = high_sub(x, y);
    return z.a > -0.000001;
}
function low_larger(x, y) {
    let z = new Float(y, 0);
    z.to_sci();
    return high_larger(x, z);
}
function low_largere(x, y) {
    let z = new Float(y, 0);
    z.to_sci();
    return high_largere(x, z);
}
function f_sci_num(s, toint = 0, fix = 2, nosign = 0) {
    let tmp = s;
    tmp.to_sci();
    if (tmp.b >= 0) {
        if (tmp.b < 3) {
            while (tmp.b > 0) {
                tmp.b -= 1;
                tmp.a *= 10;
            }
            let op = tmp.a.toFixed(fix);
            if (toint) op = parseInt(op);
            return op;
        } else {
            let op = tmp.a.toFixed(fix);
            return op + 'e' + tmp.b;
        }
    } else {
        if (tmp.b >= -2 || nosign) {
            while (tmp.b < 0) {
                tmp.b += 1;
                tmp.a /= 10;
            }
            let op = tmp.a.toFixed(fix);
            return op;
        } else {
            let op = tmp.a.toFixed(fix);
            return op + 'e' + tmp.b;
        }
    }
}
var full_c = 0, full_f = 0, full_e = 0;
var current_page = 'menu1', minor_page = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var tick_delay = 10, tick_m, god_mode = 0;
var mass = new Float(1, 1), base_mass = new Float(1, 1);
var velocity = new Float(0, 0), start_distance = new Float(1, 1), distance = new Float(1, 1), dist_mult = new Float(1, 0), acceleration = new Float(0, 0), force = new Float(0, 0);
//air force
var air_force = new Float(0, 0);
var E0 = 0, E1 = 1, E0_base = 0, E1_base = 1, E0_pow_base = 1.83, E0_pow = 1.83;
var air_force_a_mult = 0.1, air_force_d_mult = 0.2, air_force_l_mult = 2;
//substance
var buy_all_mode = 0;
var substance_category_cnt = 5;
var substance_cnt = [0, 0, 0, 0, 0, 0];
var substance_base = [new Float(0, 0), new Float(1, 1), new Float(1, 3), new Float(2, 1), new Float(6, 1), new Float(1, 6)];
var substance_cost = [new Float(0, 0), new Float(1, 1), new Float(1, 3), new Float(2, 1), new Float(6, 1), new Float(1, 6)];
var substance_base_creep = [0, 1.3, 10, -10, -40, 0];
var substance_creep = [0, 1.3, 10, -10, -40, 0];
var booster_base = new Float(1, 2), booster_force = new Float(1, 2);
var counter_mult = 2, counter_base_mult = 2;
var turbo_mult = 1.5, turbo_base_mult = 1.5;
var flow_dec = 0.1, flow_base_dec = 0.1;
var stellar_charge = new Float(1, 0), base_stellar_charge = new Float(1, 0), cur_stellar_turbo = 0, cur_stellar_flow = 0, hard_limit = new Float(0, 0);
//automation
var automation_8_trigger = 0, automation_8_charge = 0;
var automation_category_cnt = 8, automation_delay = 1000, automation_5_trigger = new Float(0, 0), automation_charge = 0;
var automation_unlocked = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var automation_activated = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var automator_code = '', automator_running = 0, automator_last = 0, automator_loop = 0, automator_autostart = 0, space = 1, finish = 0;
var automator_codelist = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
//mach
var mach_point = new Float(0, 0), mach_inv_ratio = 50;
var mach_row = 7, mach_col = 4, mach_upgrade_43_tmp = 0, mach_upgrade_disabled = [0, 0, 0, 0, 0];
var mach_upgrade_cost = [[0, 0, 0, 0, 0], [0, 1, 1, 3, 1], [0, 5, 5, 10, 5], [0, 10, 15, 15, 10], [0, 0, 0, 0, 0], [0, 200, 100, 100, 20], [0, 1000, 2000, 1000, 50], [0, 50000, 50000, 20000, 100]];
var mach_upgrade_unlocked = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
//break mach
var max_level = 5;
var mach_broken = 0, mach_reset_base = new Float(2, 0), mach_reset_step = new Float(3.4, 2), fall_mach_reset_base = new Float(1.2, 0), fall_mach_reset_step = new Float(3.4, 2), star_mach_reset_base = new Float(1.03, 0), star_mach_reset_step = new Float(3.4, 2), star2_mach_reset_base = new Float(1.01, 0), star2_mach_reset_step = new Float(3.4, 2);
var flow_0_dec = 0.01, flow_0_base_dec = 0.01;
var break_mach_row = 4, break_mach_col = 3;
var break_mach_upgrade_cost = [[0, 0, 0, 0], [0, 1e5, 1e6, 1e6], [0, 1e8, 1e9, 1e8], [0, 1e12, 1e13, 5e11], [0, 1e20, 1e15, 1e15]];
var break_mach_upgrade_unlocked = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
var broken_heart = new Float(0, 0), broken_heart_0_base_dec = 0.98, broken_heart_0_dec = 0.98;
//stars
var rc_r = 255, rc_g = 0, rc_b = 0, rc_f = 1, outrange = 0, outrange_dir = 1;
var star_upgrade_17_max = 0, rainbow_charge = 0;
var star_point = 0, cur_star_point = 0, star_point_base = 1.1, extra_point = 0;
var stars_upgrade_category_cnt = 39, to_respec = 0;
var max_mach_point = new Float(0, 0);
var stars_upgrade_codelist = ['', '01', '11', '12', '13', '21', '22', '23', '31', '32', '33', '41', '42', '51', '52', '61', '62', '63', '71', '72', '73', '81', '82', '83', '91', '101', '102', '103', '111', '112', '113', '121', '122', '123', '131', '132', '141', '151', '152', '161'];
var stars_upgrade_dic = { 'start': 1, 'st': 1, '01': 1, '11': 2, '12': 3, '13': 4, '21': 5, '22': 6, '23': 7, '31': 8, '32': 9, '33': 10, '41': 11, '42': 12, '51': 13, '52': 14, '61': 15, '62': 16, '63': 17, '71': 18, '72': 19, '73': 20, '81': 21, '82': 22, '83': 23, '91': 24, '101': 25, '102': 26, '103': 27, '111': 28, '112': 29, '113': 30, '121': 31, '122': 32, '123': 33, '131': 34, '132': 35, '141': 36, '151': 37, '152': 38, '161': 39, 'rt': 39 };
var stars_upgrade_unlocked = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var stars_upgrade_cost = [0, 1, 1, 1, 1, 1, 2, 2, 3, 2, 2, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 2, 3, 3, 4, 3, 3, 3, 3, 3, 3, 2, 2, 2, 8, 2, 5, 7, 7, 1];
var needdw = [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1], line_cnt = 43;
//relative
var ato_choice = 0, mau_choice = 0, swap_mode = 0;
var blackhole_mode = 0;
var light_speed_reality = 300015001.125, light_speed_blackhole = 340.00, light_speed_blackhole_base = 340.00;
var time_resistance = 0, max_resistance = 0, bm_stellar_charge = new Float(1, 0);
var dilated_time = new Float(0, 0), dilation_level = 0, dilation_mult = new Float(1, 0), time_mult = new Float(1, 0);
var dimension_level = 0;
var boosters_tot_cnt = 0, boosters_max_cnt = 30, boosters_category_cnt = 18;
var booster_energy = 0, booster_tot_storage = 0;
var booster_position = 1, booster_sec = 0;
class Bst {
    constructor(a, b, c) {
        this.type = a;
        this.level = b;
        this.percentage = c;
    }
}
var boosters_c = [new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0)];
var boosters_order = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var boosters_list = [new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0)];
var boosters_name = ['无', '基础', '快速', '大型', '充能', '节能', '冻结', '繁荣', '扩容', '过载', '低温', '极速', '中子星', '回收', '终焉', '极寒', '自然', '彩虹', '繁花'];
var boosters_effect = ['', '每秒 +1m/s 相对论光速', '每秒 +10m/s 相对论光速', '每秒 +1m/s 相对论光速', '每秒 +1% 能量', '每秒 +5m/s 相对论光速', '每秒 +2m/s 相对论光速, 不触发时间阻抗', '^10 恒星引擎充能速度', '+20% 能量上限', '耗尽能量, +80*能量 相对论光速', '每秒 +4m/s 相对论光速', '每秒 +40m/s 相对论光速', '移除一个黑洞', '下一个黑洞运行不耗能', '无', '时间阻抗 -50%', '所有黑洞耗能 -10%', '黑洞运行速度 +10%', '赞歌产量公式指数 +15%'];
var boosters_cost = [0, 0.01, 0.02, 0.03, 0, 0.005, 0.01, 0.01, 0.04, 0, 0.06, 0.1, 0, 0.015, 0.05, 3.08, 0.05, 0.05, 0.08];
var boosters_storage = [0, 30, 20, 100, 0, 50, 30, 30, 100, 30, 250, 20, 0, 50, 500, 100, 100, 100, 100];
var booster_selected = 0, boosters_menu = [new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0), new Bst(0, 0, 0)], booster_spawned = 0;
var relative_row = 4, relative_col = 4;
var relative_upgrade_cost = [[0, 0, 0, 0], [0, 1.00e3, 1.00e6, 1.00e9, 1.00e12], [0, 1.00e30, 1.00e40, 1.00e50, 1.00e60], [0, 1.00e150, 1.00e150, 1.00e150, 1.00e150], [0, 0, 1.00e210, 1.00e240, 0]];
var relative_upgrade_unlocked = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
var relative24_unlocked = 0, valid_operation = 0;
var stored_sp = 0;
var rr = [62.5, 125.0, 187.5, 250.0];
var dream_mode = 0, dream_completed = 0, dream_val = 0.53, dream_time = 0;
var dots_cnt = 6;
var neutron_star = 0;
var ending_triggered = 0, ending_triggering = 0;
//challenges
var restriction_category_cnt = 4, restriction_selected_cnt = 0, restriction_activated_cnt = 0;
var restriction_1_add = 2.5, restriction_2_mult = 0.63;
var restriction_selected = [0, 0, 0, 0, 0];
var restriction_activated = [0, 0, 0, 0, 0];
var challenges_category_cnt = 5, current_challenge = 0;
var challenges_unlocked = [0, 0, 0, 0, 0, 0];
var challenges_level = [0, 0, 0, 0, 0, 0];
var challenges_unlock_requirement = [0, 3e3, 6.5e3, 1.05e4, 1.75e4, 3.00e4];
var challenges_requirement = [0, 2.73e3, 950.00, 3.75e3, 1.35e4, 2.85e4];
var challenges_01_tick = 3600 * 24 * 100, challenges_01_full_tick = 3600 * 24 * 100;
var mode_name = ['标准宇宙', '挑战1: 归心', '挑战2: 空虚', '挑战3: 落红', '挑战4: 离恨', '挑战5: 烟云', '星辰挑战1: 五朵金花', '星辰挑战2: 刃尖之舞', '星辰挑战3: 梅花三弄', '星辰挑战4: 辗转反侧', '星辰挑战5: 小鸟依人'];
var challenges_name = ['', '1.归心 (推进器在购买后位移获取归零, 在24小时内逐渐复原)', '2.空虚 (推进器倍数 ^0.03, 初始推力为 50N)', '3.落红 (大幅增加空气阻力, 整流罩可以加强碎心)', '4.离恨 (禁止购买整流罩)', '5.烟云 (每过13秒, 位移获取就 x0.1)'];
var challenges_reward = [[0, 0, 0, 0, 0, 0], [0, 10, 20, 30, 40, 50], [0, 0.3, 0.4, 0.5, 0.6, 0.7], [0, 25, 50, 75, 100, 125], [0, 10, 20, 30, 40, 50], [0, 2.5, 3, 3.5, 4, 4.5]];
var star_challenges_category_cnt = 5;
var star_challenges_name = ['', '1.五朵金花 (5个普通挑战效果全部激活)', '2.刃尖之舞 (每购买一个物质, 位移获取 x0.998)', '3.梅花三弄 (只能重置3次, 禁用星辰链131)', '4.辗转反侧 (马赫点数获取倍数恒为 x1)', '5.小鸟依人 (大幅增强1.00e6m/s后的空气阻力惩罚)'];
var star_challenges_reward = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 5e4, 1e5, 2e5, 4e5, 8e5], [0, 1e10, 1e8, 1e6, 1e5, 1e4], [0, 0.1, 0.2, 0.3, 0.4, 0.5]];
var star_challenges_unlocked = [0, 0, 0, 0, 0, 0];
var star_challenges_level = [0, 0, 0, 0, 0, 0];
var star_challenges_unlock_requirement = [0, 3.75e5, 5.50e5, 1.10e6, 1.50e6, 2.25e6];
var star_challenges_requirement = [0, 525.00, 3.00e5, 1.10e6, 1.25e6, 1.50e6];
var star_challenges_star_point_requirement = [0, 5, 6, 11, 13, 7];
var star_challenge_2_dist_mult = 1, star_challenge_3_reset_cnt = 0;
//statistics
var statistics_category_cnt = 11;
var statistics = [0, 0, 0, 0, 0, 0, 0, 360000 * 999, 0, 360000 * 999, 0, 0];
//achievements
var unlock_signal = 0;
var achievements_cnt = 0, achievements_level = 0, achievements_category_cnt = 29;
var achievements_unlocked = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var achievements_name = ['', '01.随风起', '02.游隼', '03.再道轮回', '04.听见她的声音', '05.一度春秋', '06.季风来过', '07.九霄云外', '08.预见她的声音', '09.归心似箭', '10.虚无缥缈', '11.春泥', '12.恨有缘', '13.云烟成雨', '14.坠落', '15.失心', '16.一百穰', '17.星辰大海', '18.五色花', '19.十全十美', '20.负重', '21.新发展理念', '22.事不过三', '23.超脱尘俗', '24.好高骛远', '25.心碎', '26.和风', '27.敬时间, 敬永恒', '28.余匪观雨, 女匪吾顾', '29.解放'];
var destinies_cnt = 0, destinies_category_cnt = 6;
var destinies_unlocked = [0, 0, 0, 0, 0, 0, 0];
var destinies_name = ['', '-01.奈何天', '-02.坍缩', '-03.雨燕', '-04.无限纪元', '-05.偏折', '-06.暗能量星系'];