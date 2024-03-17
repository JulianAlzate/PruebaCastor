using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PruebaCastor.Controllers
{
    public class BusquedaController : Controller
    {
        // GET: BusquedaController
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        // GET: BusquedaController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: BusquedaController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: BusquedaController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: BusquedaController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: BusquedaController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: BusquedaController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: BusquedaController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
