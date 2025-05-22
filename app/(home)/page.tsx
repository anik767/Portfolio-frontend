

export default function Home() {
  return (
    <div  
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: '#F4F1EA',
        color: "#1F2235",
        textAlign: "center",
        fontFamily:"cursive"
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>Welcome to My Website</h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "600px" }}>
        This is the home page. Explore our site to learn more about us!
      </p>
      
    </div>
  );
}
