class EPlayer extends EEntityBase{
    
    constructor(id, name, time = new Date()) {
        super();
        this.id = id
        this.name = name;
        this.time = time
        this.money = 0;
    }

    addMoney(money) {
        this.money += money;
    }

    subtrackMoney(money) {
        this.money -= money;
    }
}