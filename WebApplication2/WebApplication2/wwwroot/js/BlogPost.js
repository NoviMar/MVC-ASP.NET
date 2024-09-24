
    $(document).ready(function () {
        $('.position-button').click(function () {
            var positionId = $(this).data('position-id');
            $.ajax({
                url: '@Url.Action("GetDataByPositionIdJson", "Home")',
                type: 'GET',
                data: { positionId: positionId },
                success: function (data) {
                    $("#dataTable tbody").empty();
                    data.forEach(function (user) {
                        $("#dataTable tbody").append(row(user));
                    });
                },
                error: function () {
                }
            });
        });
        });


    function row(user) {
            return `
    <tr data-rowid="${user.id}">
        <td>${user.lastName}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.positionId}</td>
        <td>
            <a href="/Details?id=${user.id}">Детали</a>
            <a href="/Edit?id=${user.id}">Изменить</a>
            <a href="/Delete?id=${user.id}">Удалить</a>
        </td>
    </tr>`;
        }



    function getUser(id) {
        $.ajax({
            url: `/api/users/${id}`,
            type: "GET",
            dataType: "json",
            success: function (user) {
                $("#userId").val(user.id);
                $("#userLastName").val(user.lastName);
                $("#userName").val(user.name);
                $("#userEmail").val(user.email);
                $("#userPositionId").val(user.positionId);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error('Ошибка при получении данных:', textStatus);
            }
        });
        }



    function createUser(userLastName, userName, userEmail, userPositionId, userImagePath) {
        $.ajax({
            url: "/api/users",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                lastName: userLastName,
                name: userName,
                email: userEmail,
                positionId: userPositionId,
                imagePath: userImagePath
            }),
            success: function (data) {
                document.querySelector("tbody").innerHTML += row(data);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error('Ошибка при выполнении запроса:', textStatus);
            }
        });
        }


    function editUser(userId, userLastName, userName, userEmail, userPositionId, userImagePath) {
        $.ajax({
            url: "/api/users",
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify({
                id: userId,
                lastName: userLastName,
                name: userName,
                email: userEmail,
                positionId: userPositionId,
                imagePath: userImagePath
            }),
            success: function (data) {
                document.querySelector(`tr[data-rowid='${data.id}']`).outerHTML = row(data);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error('Ошибка при выполнении запроса:', textStatus);
            }
        });
        }



    async function deleteUser(id) {
            const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
    headers: {"Accept": "application/json" }
            });
    if (response.ok === true) {
                const user = await response.json();
    document.querySelector(`tr[data-rowid='${user.id}']`).remove();
            } else {
                const error = await response.json();
    console.log(error.message);
            }
        }

    function reset() {
        document.getElementById("userId").value =
        document.getElementById("userLastName").value =
        document.getElementById("userName").value = "";
    document.getElementById("userEmail").value = "";
    document.getElementById("userPositionId").value = "";
        }


    function row(user) {
            return `
    <tr data-rowid="${user.id}">
        <td>${user.lastName}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.positionId}</td>
        <td>
            <a href="/Details?id=${user.id}">Детали</a>
            <a href="/Edit?id=${user.id}">Изменить</a>
            <a href="/Delete?id=${user.id}">Удалить</a>
        </td>
    </tr>`;
        }

    const lettersOnlyRegex = /^[A-Za-z]+$/;
    const integerRegex = /^-?\d+$/;

        document.getElementById("resetBtn").addEventListener("click", () => reset());

        document.getElementById("saveBtn").addEventListener("click", async () => {
            const usid = document.getElementById("userId").value;
    const lastName = document.getElementById("userLastName").value;
    const usname = document.getElementById("userName").value;
    const email = document.getElementById("userEmail").value;
    const positionId = document.getElementById("userPositionId").value;
    if (usid === "")
    await createUser(lastName, usname, email, positionId);
    else
    await editUser(usid, lastName, usname, email, positionId);
    reset();
        });
