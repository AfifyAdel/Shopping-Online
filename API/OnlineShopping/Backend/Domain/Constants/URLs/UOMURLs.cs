using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Constants.URLs
{
    public abstract class UOMURLs
    {
        public const string GetUOMs = "api/UOM/GetUOMs";
        public const string GetUOMByCode = "api/UOM/GetUOMByCode/{code}";
        public const string AddUOM = "api/UOM/AddUOM";
        public const string DeleteUOM = "api/UOM/DeleteUOM";
    }
}
