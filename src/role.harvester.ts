export const roleHarvester = {
    run: function (creep: Creep) {
        const cdata = creep.memory;
        if (cdata.harvesting===undefined) cdata.harvesting = false;
        if (!cdata.harvesting) {
            if (creep.store[RESOURCE_ENERGY]==0) {
                cdata.harvesting = true;
                creep.say("🔄 harvest");
            }
        } else if (creep.store.getFreeCapacity() == 0) {
            cdata.harvesting = false;
            creep.say("📦 storing");
        }
        if (cdata.harvesting) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {
                    visualizePathStyle: { stroke: "#ffaa00" },
                });
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    );
                },
            });
            if (targets.length > 0) {
                if (
                    creep.transfer(targets[0], RESOURCE_ENERGY) ==
                    ERR_NOT_IN_RANGE
                ) {
                    creep.moveTo(targets[0], {
                        visualizePathStyle: { stroke: "#ffffff" },
                    });
                }
            } else {
                // just to get him out of there
                creep.moveTo(Game.spawns.Spawn1);
            }
        }
    },
};
