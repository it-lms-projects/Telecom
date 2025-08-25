<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maintenance Job #{{ $title }}</title>
    
    <style type="text/css">
        * {
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background: #fff;
            color: #333;
        }

        .form-container {
            max-width: 800px;
            margin: auto;
            border: 1px solid transparent;
            padding: 24px;
            border-radius: 4px;
        }

        .job-number {
            background-color: #e5e5e5;
            padding: 16px;
            font-size: 1.2em;
            font-weight: bold;
            margin-bottom: 32px;
            border-bottom: 2px solid #000;
        }

        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px 48px;
        }

        .form-group {
            display: flex;
            flex-direction: column;
        }

        .form-group label {
            font-size: 0.85rem;
            color: #555;
            margin-bottom: 4px;
        }

        .form-group div.input,
        .form-group div.select {
            font-size: 1rem;
            padding: 6px 4px;
            border: none;
            border-bottom: 1px solid #999;
            outline: none;
            background: transparent;
        }

        .form-group div.input:focus,
        .form-group div.select:focus {
            border-bottom-color: #000;
        }

        header, section, footer {
            background: #ffffff;
            padding: 20px;
            margin-bottom: 20px;
        }

        h1, h2 {
            color: #333;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        table, th, td {
            border: 1px solid transparent;
        }

        th, td {
            padding: 10px;
            text-align: left;
        }

        th {
            background-color: #333;
            color: white;
        }

        footer {
            text-align: center;
            font-weight: bold;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        td {
            vertical-align: top;
            padding: 10px 5px;
            width: 50%;
        }

        .label {
            font-size: 12px;
            color: #777;
            margin-bottom: 4px;
            display: block;
        }

        .value {
            border-bottom: 1px solid #999;
            padding: 4px 0;
            font-size: 14px;
        }

        .spacer {
            height: 10px;
        }

    </style>
</head>
<body>
    <div class="form-container">
        <div class="job-number">Numéro<br>#{{ $title }}</div>        

        <table>
            <tr>
                <td>
                    <span class="label">Date début</span>
                    <div class="value">{{ $startDate }}</div>
                </td>
                <td>
                    <span class="label">Date fin</span>
                    <div class="value">{{ $endDate }}</div>
                </td>
            </tr>
        
            <tr>
                <td>
                    <span class="label">Lieu</span>
                    <div class="value">{{ $location }}</div>
                </td>
                <td>
                    <span class="label">Destination</span>
                    <div class="value">{{ $destination }}</div>
                </td>
            </tr>
        
            <tr>
                <td>
                    <span class="label">Relation</span>
                    <div class="value">{{ $relation }}</div>
                </td>
                <td>
                    <span class="label">Truck / Link / Super-Link</span>
                    <div class="value">{{ $truck }}</div>
                </td>
            </tr>
        
            <tr>
                <td>
                    <span class="label">Chauffeur</span>
                    <div class="value">{{ $driver }}</div>
                </td>
                <td>
                    <span class="label">Index Km</span>
                    <div class="value">{{ $indexKm }}</div>
                </td>
            </tr>
        </table>
    </div>

    <section>
        <h2>Tâches</h2>
        <table>
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Description</th>
                    <th>Début</th>
                    <th>Fin</th>
                    <th>Statut</th>
                    <th>Agent</th>
                </tr>
            </thead>
            <tbody>
                @foreach($tasks as $task)
                    <tr>
                        <td>{{ $task['title'] ?? '' }}</td>
                        <td>{{ $task['description'] ?? '' }}</td>
                        <td>{{ $task['startDate'] ?? '' }}</td>
                        <td>{{ $task['endDate'] ?? '' }}</td>
                        <td>{{ $task['status']['state'] ?? '' }}</td>
                        <td>{{ $task['status']['agent'] ?? '' }}</td>
                    </tr>
                @endforeach
                
            </tbody>
        </table>
    </section>    

    <footer>
        <p><strong>Signature:</strong> {{ $systemDate }} - Muzuri Sana SA</p>
    </footer>

</body>
</html>
