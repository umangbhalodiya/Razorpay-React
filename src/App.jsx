import "./App.css";

function App() {
   const orderPlace = () => {
    console.log("order placed");
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const pay = async () => {
    let amount = 100;
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_AWrlyaXOO9ncih", // This is Api key. you will get it from razorpay dashboard > account and settings > API keys
      amount: parseInt(amount * 100),
      currency: "INR", // your 3 letter currency code
      name: "Umang Bhalodiya", // project or transaction name
      description: "Test Transaction",
      image: "https://avatars.githubusercontent.com/u/76506184?v=4", // your project logo
      handler: function (response) {
        // console.log("response", response);
        orderPlace(); // after payment completes on stripe this function will be called and you can do your stuff
      },
      prefill: {
        name: "Umang Bhalodiya",
        email: "umangbhalodiya660@gmail.com",
        contact: "9988556633",
      },
      notes: {
        address: "India",
      },
      theme: {
        color: "#158993",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="App">
      <button
        className="button_pay"
        onClick={() => {
          pay();
        }}
      >
        Pay with Razorpay
      </button>
    </div>
  );
}

export default App;
