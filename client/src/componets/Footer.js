const Footer = () => {
    return (
      <footer
        className="text-white"
        style={{ backgroundColor: "rgb(2, 59, 139)" }} 
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row justify-center items-center"> 
            
            <div className="mb-4 md:mb-0 pt-3 text-center"> 
              <h3 className="text-2xl font-bold">TechNova</h3>
              <p className="text-sm text-gray-300 mt-1">
                Stay updated with the latest tech & trends.
              </p>
            </div>
          </div>
  
          <div className="border-t border-gray-700 mt-4 pt-4 pb-4 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} TechNova. All Rights Reserved.
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  