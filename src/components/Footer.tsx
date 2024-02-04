import sttp from "../assets/react.svg";
import sttpgonflable from "../assets/react.svg";
import sttplocation from "../assets/react.svg";
import watersky from "../assets/react.svg";

export default function Footer() {
  return (
    <footer className="bg-body-tertiary text-center">
      <div className="container p-4 pb-0">
        <section className="mb-4">
          <div className="btn text-white btn-floating m-1 mx-4">
            <img
              src={sttplocation}
              alt="Image 1"
              style={{ width: "200px", height: "120px" }}
            />
          </div>

          <div className="btn text-white btn-floating m-1 mx-4">
            <img
              src={watersky}
              alt="Image 2"
              style={{ width: "200px", height: "120px" }}
            />
          </div>

          <div className="btn text-white btn-floating m-1 mx-4">
            <img
              src={sttp}
              alt="Image 3"
              style={{ width: "200px", height: "120px" }}
            />
          </div>

          <div className="btn text-white btn-floating m-1 mx-4">
            <img
              src={sttpgonflable}
              alt="Image 4"
              style={{ width: "200px", height: "120px" }}
            />
          </div>
        </section>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        Copyright © 2023 Groupe Mdhaffar. All rights reserved.
      </div>
    </footer>
  );
}
