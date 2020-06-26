import { roleHarvester } from "./role.harvester";
import { roleUpgrader } from "./role.upgrader";

export const loop = function () {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log("Clearing non-existing creep memory:", name);
        }
    }

    const spawn = Game.spawns.Spawn1;
    if (spawn===undefined) return;

    var harvesters = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "harvester"
    );
    var numh = harvesters.length;
    if (numh != Memory.numh) {
        Memory.numh = numh;
    }

    var upgraders = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "upgrader"
    );
    var numu = upgraders.length;
    if (numu != Memory.numu) {
        Memory.numu = numu;
    }

    if (numh < 2 && Game.spawns["Spawn1"].energy >= 300) {
        var newName = "Harvester" + Game.time;
        console.log("Spawning new harvester: " + newName);
        spawn.spawnCreep([MOVE, MOVE, WORK, CARRY, CARRY], newName, {
            memory: { role: "harvester" },
        });
    } else if (numu < 4 && Game.spawns["Spawn1"].energy >= 300) {
        var newName = "Upgrader" + Game.time;
        console.log("Spawning new upgrader: " + newName);
        spawn.spawnCreep([MOVE, WORK, CARRY, CARRY, CARRY], newName, {
            memory: { role: "upgrader" },
        });
    }

    if (spawn.spawning) {
        var spawningCreep = Game.creeps[spawn.spawning.name];
        spawn.room.visual.text(
            "🛠️" + spawningCreep.memory.role,
            spawn.pos.x + 1,
            spawn.pos.y,
            { align: "left", opacity: 0.8 }
        );
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == "harvester") {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == "upgrader") {
            roleUpgrader.run(creep);
        }
    }
};
