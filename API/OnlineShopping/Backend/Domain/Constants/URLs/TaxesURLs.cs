using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Constants.URLs
{
    public static class TaxesURLs
    {
        public const string GetTaxes = "api/Tax/GetTaxes";
        public const string GetTaxByCode = "api/Tax/GetTaxByCode/{code}";
        public const string AddTax = "api/Tax/AddTax";
        public const string DeleteTax = "api/Tax/DeleteTax";
    }
}
