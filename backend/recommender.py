def get_priority_label(weight):
    if weight >= 5:
        return "Critical"
    elif weight >= 4:
        return "High"
    else:
        return "Useful"


def prioritize_missing_skills(missing_skills, job_weights):
    prioritized = []

    for skill in missing_skills:
        if skill in job_weights:
            weight = job_weights[skill]
            label = get_priority_label(weight)

            prioritized.append((skill, weight, label))

    prioritized.sort(key=lambda x: x[1], reverse=True)

    return prioritized


def generate_recommendation(priority_skills):
    if not priority_skills:
        return "Excellent! You have all the required skills for this job."

    recommendations = []

    for skill, weight, label in priority_skills:
        recommendations.append(
            f"{label}: Learn {skill}"
        )

    return recommendations