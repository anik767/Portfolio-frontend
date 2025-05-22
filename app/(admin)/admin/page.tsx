export default function admin() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to right, #6a11cb, #2575fc)",
          color: "white",
          textAlign: "center",
          fontFamily: "'Arial', sans-serif",
        }}
        
      >
         <h1 style={{fontFamily:"cursive"}}>admin</h1>
        <h1 style={{ fontSize: "3rem", marginBottom: "10px",fontFamily:"cursive" }}>Welcome to My Admin</h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "600px",fontFamily:"cursive" }}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis eos possimus non! Eveniet sequi deleniti facilis minus repudiandae odio quasi. Earum vero eveniet fugiat magni numquam aperiam, excepturi cumque officia.
        </p>
        
      </div>
    );
  }