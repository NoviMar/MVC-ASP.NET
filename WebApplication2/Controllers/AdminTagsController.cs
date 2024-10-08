﻿using Microsoft.AspNetCore.Mvc;
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

        // GET: AdminTagsController/Add
        [HttpGet]
        public IActionResult Add()
        {
            return View();
        }

        // POST: AdminTagsController/Add
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

                // Перенаправление на страницу добавления с сообщением об успешном добавлении
                TempData["SuccessMessage"] = "Tag added successfully!";
                return RedirectToAction("Add");
            }

            // Если модель не валидна, вернуть ту же страницу с ошибками
            return View(addTagRequest);
        }
    }
}