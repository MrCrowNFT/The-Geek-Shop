const OrderTab = () => {
  return (
    <div>
      <form>
        <label htmlFor="name">Full name:</label>
        <input type="text" id="name" name="name"></input>
        <br />
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email"></input>
        <br />
        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" name="phone"></input>
        <br />
        <label htmlFor="id">Id:</label>
        <input type="text" id="id" name="id"></input>
        <br />
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address"></input>
        <br />
        <label htmlFor="state">State:</label>
        <input type="textarea" id="state" name="state"></input>
        <br />
        <label htmlFor="instructions">Instructions</label>
        <textarea
          type="text"
          id="instructions"
          name="instructions"
          rows="4"
          cols="50"
        ></textarea>
        <br />
        <button type="submit">Next</button>
      </form>
    </div>
  );
};
export default OrderTab;
