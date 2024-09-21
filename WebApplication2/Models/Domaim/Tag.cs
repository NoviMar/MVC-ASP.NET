namespace WebApplication2.Models.Domaim
{

        public class Tag
        {
            public Guid Id { get; set; }
            public int MyProperty { get; set; }
            public int MyProperty1 { get; set; }
            public ICollection<BlogPost> BlogPosts { get; set; }
        }
 

}
