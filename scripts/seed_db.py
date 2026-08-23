"""
InsightPilot AI — Database Seeding CLI Tool
Usage: python scripts/seed_db.py
"""

import sys
import os

# Add root directory to python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.app.db.seed import seed_database

if __name__ == "__main__":
    print("=== InsightPilot AI Database Seeding Pipeline ===")
    result = seed_database()
    print("Seeding completed successfully:")
    for table, count in result["raw_dataset_rows"].items():
        print(f"  • {table}: {count:,} rows")
    print(f"  • kpis_registered: {result['kpis_registered']} KPIs")
    print("=================================================")
