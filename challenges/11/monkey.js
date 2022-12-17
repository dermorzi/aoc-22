module.exports.Monkey = class Monkey {
  id;
  items;
  inspected = 0;
  #monkeys;
  #targets;
  #operation = () => undefined;

  /**
   *Creates an instance of Monkey.
   * @param {number} id
   * @param {number[]} items
   * @param {Monkey[]} monkeys
   * @memberof Monkey
   */
  constructor(id, items, monkeys) {
    this.id = id;
    this.items = items;
    this.#monkeys = monkeys;
  }

  /**
   * @param { number } item
   * @returns
   * @memberof Monkey
   */
  addItem(item) {
    this.items.push(item);
    return this;
  }

  /**
   * @param { Function} test
   * @returns
   * @memberof Monkey
   */
  addTest(divisibleBy, targets) {
    this.#targets = targets;
    this.divisibleBy = divisibleBy;
    return this;
  }

  /**
   * @param { Function } operation
   * @returns
   * @memberof Monkey
   */
  addOperation(operation) {
    this.#operation = operation;
    return this;
  }

  #throwItem(item, target_id) {
    this.#monkeys[target_id].addItem(item);
  }

  inspect(item, divisor, modulo = false) {
    this.inspected += 1;
    item = this.#operation(item);
    item = Math.floor((modulo) ? item % divisor : item / divisor);
    const target = (item % this.divisibleBy) ? this.#targets[0] : this.#targets[1];
    this.#throwItem(item, target);
  }
}
