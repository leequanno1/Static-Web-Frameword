// import "../fws/entitybase/eEntityBase"
class EPlayer extends EEntityBase{
    
    constructor(id, name) {
        super();
        this.id = id
        this.name = name;
        this.time = new Date();
        this.money = 0;
    }

    addMoney(money) {
        this.money += money;
    }

    subtrackMoney(money) {
        this.money -= money;
    }
}