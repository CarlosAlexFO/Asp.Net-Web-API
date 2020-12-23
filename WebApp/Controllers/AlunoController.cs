using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApp.Models;

namespace WebApp.Controllers
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/Aluno")]
    public class AlunoController : ApiController
    {
        // GET: api/Aluno
        [HttpGet]
        [Route("Recuperar")]
        public IHttpActionResult Recuperar()
        {
            try
            {
                Alunos aluno = new Alunos();
                return Ok(aluno.ListarAlunos());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }

        // GET: api/Aluno/5
        [HttpGet]
        [Route("Recuperar/{id:int}/{nome}/{sobrenome=andrade}")]
        public Alunos Get(int id)
        {
            Alunos aluno = new Alunos();

            return aluno.ListarAlunos().Where(x => x.Id == id).FirstOrDefault();
        }

        [HttpGet]
        [Route(@"RecuperarPorDataNome/{data:regex([0-9]{4}\-[0.9]{2})}/{nome:minlength(5)}")]
        public Alunos Recuperar(string data, string nome)
        {
            Alunos aluno = new Alunos();

            return aluno.ListarAlunos().Where(x => x.Data == data || x.Nome == nome).FirstOrDefault();
        }

        // POST: api/Aluno
        public List<Alunos> Post(Alunos aluno)
        {
            Alunos _aluno = new Alunos();
            _aluno.Inserir(aluno);

            return _aluno.ListarAlunos();

        }

        // PUT: api/Aluno/5
        public Alunos Put(int id, [FromBody]Alunos aluno)
        {
            Alunos _aluno = new Alunos();

            return _aluno.Atualizar(id, aluno);
        }

        // DELETE: api/Aluno/5
        public void Delete(int id)
        {
            Alunos _aluno = new Alunos();
            _aluno.Deletar(id);

        }
    }
}
