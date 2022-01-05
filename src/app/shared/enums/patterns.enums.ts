export enum Pattern {
    Name = "^[a-zA-Z0-9,'-.]+$",
    Username = "^(\\S+){5}$",
    Password = "^(?=.*[A-Za-z])(?=.*[0-9])(.*)$",
    EmailAddress = "^((?!\\.)(?!.*\\.\\.)[\\w-_.]*[^.])(@\\w+)(\\.\\w+(\\.\\w+)?[^.\\W])$",
    Name_without_Sapces="^[A-Za-z0-9.,'\"-]+( [A-Za-z0-9.,'\"-]+)*$",
    URL="^((https?:\\/\\/)?([\\w\\-])+\\.{1}([a-zA-Z]{2,63})([\\/\\w-]*)*\\/?\\??([^#\\n\\r]*)?#?([^\\n\\r]*))$",
    Number="^[0-9.]+$",
    OnlyNumber = "^[0-9]+$"
}