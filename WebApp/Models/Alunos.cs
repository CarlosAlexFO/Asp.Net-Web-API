using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace WebApp.Models
{
    public class Alunos
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public string Sobrenome { get; set; }

        public string Telefone { get; set; }

        public string Data { get; set; }

        public int Ra { get; set; }


        public List<Alunos> ListarAlunos()//listar os alunos
        {
            var CaminhoArquivo = HostingEnvironment.MapPath(@"~/App_Data/Base.json");

            var Json = File.ReadAllText(CaminhoArquivo);
            var ListaAlunos = JsonConvert.DeserializeObject<List<Alunos>>(Json);
        
            return ListaAlunos;
        }

        public bool RescreverArquivo(List<Alunos> listaAlunos)
        {
            var CaminhoArquivo = HostingEnvironment.MapPath(@"~/App_Data/Base.json");

            var Json = JsonConvert.SerializeObject(listaAlunos, Formatting.Indented);
            File.WriteAllText(CaminhoArquivo, Json);

            return true;
        }

        public Alunos Inserir(Alunos Aluno)
        {
            var ListaAlunos = this.ListarAlunos();

            var MaxId = ListaAlunos.Max(aluno => Aluno.Id);
            Aluno.Id = MaxId + 1;
            ListaAlunos.Add(Aluno);

            RescreverArquivo(ListaAlunos);
            return Aluno;
        }

        public Alunos Atualizar(int Id, Alunos Aluno)
        {
            var ListarAlunos = this.ListarAlunos();

            var ItemIndex = ListarAlunos.FindIndex(p => p.Id == Aluno.Id);
            if (ItemIndex >= 0)
            {
                Aluno.Id = Id;
                ListarAlunos[ItemIndex] = Aluno;
            }
            else
            {
                return null;
            }
            RescreverArquivo(ListarAlunos);
            return Aluno;
        }


        public bool Deletar(int Id)
        {
            var ListaAlunos = this.ListarAlunos();

            var ItemIndex = ListaAlunos.FindIndex(Aluno => Aluno.Id == Id);
            if(ItemIndex >= 0)
            {
                ListaAlunos.RemoveAt(ItemIndex);
            }
            else
            {
                return false;
            }
            RescreverArquivo(ListaAlunos);
            return true;
        }

    }
}