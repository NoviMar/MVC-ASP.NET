using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using WebApplication2.Models;
using WebApplication2.Data;
using WebApplication2.Models.Domaim;
namespace WebApplication2.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly BloggieDbContext bloggieDbContext;
        private readonly List<BlogPost> blogPosts;
        private readonly List<Tag> tags;

        public HomeController(BloggieDbContext bloggieDbContext)
        {
            this.bloggieDbContext = bloggieDbContext;
            this.blogPosts = new List<BlogPost>();
            this.tags = new List<Tag>();
        }

        public IActionResult Index()
        {
            var tag = bloggieDbContext.Tags.ToList();
            ViewBag.Tag = tag;
            var BlogPost = bloggieDbContext.BlogPosts.ToList();
            return View(BlogPost);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
