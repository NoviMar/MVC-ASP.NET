using Microsoft.AspNetCore.Mvc;
using WebApplication2.Data;
using WebApplication2.Models.Domaim;
using WebApplication2.Models.Domaim;
using WebApplication2.Models.ViewModels;

namespace WebApplication2.Controllers
{
    public class AdminTagsController : Controller
    {
        private readonly BloggieDbContext _bloggieDbContext;

        public AdminTagsController(BloggieDbContext bloggieDbContext)
        {
            _bloggieDbContext = bloggieDbContext;
        }
        [HttpGet]
        public IActionResult Add()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Add(AddTagRequest addTagRequest)
        {
            if (ModelState.IsValid)
            {
                var tag = new Tag
                {
                    Name = addTagRequest.Name,
                    DisplayName = addTagRequest.DisplayName
                };

                _bloggieDbContext.Tags.Add(tag);
                _bloggieDbContext.SaveChanges();

                TempData["SuccessMessage"] = "Tag added successfully!";
                return RedirectToAction("Add");
            }

            return View(addTagRequest);
        }
    }
}
