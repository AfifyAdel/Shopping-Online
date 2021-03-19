using System.Security.Cryptography;
using System.Text;

namespace Domain.Utilities
{
    public static class Cryptography
    {
        public static string Encrypt(string input)
        {
            var md5Hash = MD5.Create();
            // Convert the input string to a byte array and compute the hash.
            var data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            var sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data 
            // and format each one as a hexadecimal string.
            foreach (var it in data)
            {
                sBuilder.Append(it.ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }

        public static string Decrypt(string input)
        {
            if (!string.IsNullOrEmpty(input))
            {
                char[] hexCharArr = input.ToCharArray();

                char tmp = hexCharArr[0];
                hexCharArr[0] = hexCharArr[hexCharArr.Length - 1];
                hexCharArr[hexCharArr.Length - 1] = tmp;

                input = new string(hexCharArr);
                string decrypInput = ConvertHexToString(input);
                return decrypInput;
            }
            else
            {
                return "";
            }
        }

        private static string ConvertHexToString(string hexInput)
        {
            string strValue = "";
            while (hexInput.Length > 0)
            {
                strValue += System.Convert.ToChar(System.Convert.ToUInt32(hexInput.Substring(0, 2), 16)).ToString();
                hexInput = hexInput.Substring(2, hexInput.Length - 2);
            }
            return strValue;
        }
    }
}
