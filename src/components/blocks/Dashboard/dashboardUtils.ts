/* ONLY logic */
import type { DashboardUser } from "./types";
import type { AgeGroup, DashboardStats, GenderStats, RoleId, RoleStats, ChartData, GenderId } from "./types";

export function getAge(date: string): number {

    const birth = new Date(date);
    const today = new Date();

    let age =
        today.getFullYear() -
        birth.getFullYear();

    const month =
        today.getMonth() -
        birth.getMonth();

    if (
        month < 0 ||
        (
            month === 0 &&
            today.getDate() <
            birth.getDate()
        )
    ) {
        age--;
    }

    return age;
}

export function buildDashboardStats(
    users: DashboardUser[]
): DashboardStats {

    const roles: RoleStats = {
        ROOT: 0,
        ADMIN: 0,
        USER: 0,
        GUEST: 0,
    };

    const gender: GenderStats = {

        Masculino: 0,

        Femenino: 0,

        Otro: 0,

    };

    const ageGroups: AgeGroup[] = [
        { label: "0-17", count: 0 },
        { label: "18-25", count: 0 },
        { label: "26-35", count: 0 },
        { label: "36-45", count: 0 },
        { label: "46-60", count: 0 },
        { label: "60+", count: 0 },
    ];

    let ageSum = 0;
    let youngest = Infinity;
    let oldest = 0;

    users.forEach(user => {
        const role =
            user.role.toUpperCase() as RoleId;
        roles[role]++;

        switch (user.genero) {
            case "Masculino":
                gender.Masculino++;
                break;

            case "Femenino":
                gender.Femenino++;
                break;

            default:
                gender.Otro++;

        }

        const age =
            getAge(user.fechaNacimiento);

        ageSum += age;

        youngest =
            Math.min(youngest, age);

        oldest =
            Math.max(oldest, age);

        if (age < 18)

            ageGroups[0].count++;

        else if (age <= 25)
            ageGroups[1].count++;

        else if (age <= 35)
            ageGroups[2].count++;

        else if (age <= 45)
            ageGroups[3].count++;

        else if (age <= 60)
            ageGroups[4].count++;

        else
            ageGroups[5].count++;

    });

    const roleChart: ChartData<RoleId>[] = [

        {
            id: "ROOT",
            label: "Root",
            value: roles.ROOT,
        },

        {
            id: "ADMIN",
            label: "Admin",
            value: roles.ADMIN,
        },

        {
            id: "USER",
            label: "User",
            value: roles.USER,
        },

        {
            id: "GUEST",
            label: "Guest",
            value: roles.GUEST,
        },

    ];

    const genderChart: ChartData<GenderId>[] = [

        {
            id: "Female",
            label: "Female",
            value: gender.Femenino,
        },

        {
            id: "Male",
            label: "Male",
            value: gender.Masculino,
        },

        {
            id: "Other",
            label: "Other",
            value: gender.Otro,
        },

    ];

    return {
        totalUsers: users.length,
        averageAge: users.length ? Math.round(ageSum / users.length) : 0,
        youngest: youngest === Infinity ? 0 : youngest,
        oldest,
        roles,
        gender,
        ageGroups,
        roleChart,
        genderChart,
    };
}