using BlockchainCertificatesIssuer.API.Models;
using FluentValidation;

namespace BlockchainCertificatesIssuer.API.Validations
{
    internal class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();
        }
    }
}
