import "./App.css";
import { useState, useEffect } from "react";

var products = [
  {
    name: "dio",
    cont: 1,
    disc: "hahahaha",
    price: 10,
    img:
      "https://images-us.nivea.com/-/media/media-center-items/0/1/1/273147-web_1010x1180_transparent_png.png",
  },
  {
    name: "dio wommen",
    disc: "hahahaha",
    price: 20,
    cont: 1,
    img:
      "https://images.ctfassets.net/w9l9p5870v5o/6sr1kub8nD0Gm1J5SR6URr/373f8f6948c3699901c45609e9e605d9/Secret_Original_IS_PowderFresh_00037000123439.png",
  },
  {
    name: "protect",
    disc: "hahahaha",
    cont: 1,
    price: 15,
    img:
      "https://images-us.nivea.com/-/media/media-center-items/a/3/1/3793e462eee84464bd577a659979f0be-web_1010x1180_transparent_png.png",
  },
];

function App() {
  const [basket, setbasket] = useState([]);
  const [total, setTotal] = useState(0);
  function calcTotal() {
    var sum = 0;
    for (var i = 0; i < basket.length; i++) {
      sum += basket[i].price * basket[i].cont;
    }
    setTotal(sum);
    localStorage.setItem("total", JSON.stringify(sum));
  }

  useEffect(() => {
    if (localStorage.getItem("products")) {
      setbasket(JSON.parse(localStorage.getItem("products")));
    } else {
      localStorage.setItem("products", JSON.stringify([]));
    }
    if (localStorage.getItem("total")) {
      setTotal(JSON.parse(localStorage.getItem("total")));
    } else {
      localStorage.setItem("total", JSON.stringify(0));
    }
  }, []);

  function add(item) {
    var arr = basket;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].name === item.name) {
        arr[i].cont += 1;
        console.log(arr);
        setbasket(arr);
        localStorage.setItem("products", JSON.stringify(basket));
        calcTotal();
        return;
      }
    }
    arr.push(item);
    setbasket(arr);
    localStorage.setItem("products", JSON.stringify(basket));
    calcTotal();
  }

  function del(i) {
    var arr = basket;
    arr.splice(i, 1);
    setbasket(arr);
    localStorage.setItem("products", JSON.stringify(basket));
    calcTotal();
  }

  return (
    <div>
      <div className="cont">
        {products.map((prod, i) => {
          return (
            <div className="card" id="product" key={i}>
              <img src={prod.img} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{prod.name}</h5>
                <p className="card-text">{prod.disc}</p>
                <h3>{prod.price} $</h3>
                <a
                  className="btn btn-primary"
                  onClick={() => {
                    add(prod);
                  }}
                >
                  add to basket
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <div className="basket">
        {basket.map((item, j) => {
          return (
            <li key={j}>
              {item.name} --- {item.price} --- X{item.cont} -----
              <button
                onClick={() => {
                  del(j);
                }}
              >
                X
              </button>
            </li>
          );
        })}
        <h1>Total : {total} $</h1>
      </div>
    </div>
  );
}

export default App;
