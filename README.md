<h1>Тестовое задание(MYRTEX)</h1>
<h3>Инструкция по запуску проекта:<h3>
<h4>
<p>
    1. Файлы "testdb.mdf" и "testdb_log.ldf" из каталога Database скопировать в каталог DATA Sql-сервера  установленного на компьютере.
    <br>
    Примерный путь: "C:\Program Files\Microsoft SQL Server\MSSQL%Номер_версии%.%Название_сервера%\MSSQL\DATA"
</p>
<p>
    2. Запустить SSMS от имени администратора и подключиться к серверу-> Databases(right-click) -> Attach -> Add -> Выбрать файл "testdb.mdf" -> OK
</p>
<p>
    3. В файле "TestForMyrtex\appsettings.json" заменить %Название_сервера% на своё.<br> Пример: "Server=.\\SQLSERVER;Database=testdb; Trusted_Connection=Yes;"
</p>
<p>
    4. Открыть решение -> запустить Package Manager Console -> Перейти в каталог "TestForMyrtex\ClientApp\" -> запустить команду "npm install".
</p>
<p>
    5. Запустить проект на выполнение
</p>
</h4>
