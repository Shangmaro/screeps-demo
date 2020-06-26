interface CreepMemory {
    role: string;
    upgrading?: boolean;
    harvesting?: boolean;
}

interface Memory {
    numh: number;
    numu: number;
}

interface Console {
    log(message: String | Object, ...args: any[]): void;
}
declare var console: Console;
