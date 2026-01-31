import "../fws/entitybase/eEntityBase"

class EHistoryLog extends EEntityBase {

    constructor(id) {
        super();
        this.id = id;

    }

    getEntityId() {
        return this.id;
    }

}